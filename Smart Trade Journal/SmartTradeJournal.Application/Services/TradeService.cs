using SmartTradeJournal.Application.DTOs;
using SmartTradeJournal.Application.Interfaces;
using SmartTradeJournal.Domain.Entities;
using SmartTradeJournal.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using CsvHelper;
using System.Globalization;
namespace SmartTradeJournal.Application.Services;

public class TradeService : ITradeService
{
    private readonly ITradeRepository _repository;
    private readonly IUserRepository _userRepository;
    private readonly ILogger<TradeService> _logger;
    public TradeService(ITradeRepository repository,IUserRepository userRepository, ILogger<TradeService> logger)
    {
        _repository = repository;
        _userRepository = userRepository;
        _logger = logger;
    }
    
         private void ValidateTrade(CreateTradeDto dto)

            {

                
                 if (dto.EntryPrice <= 0)
                   throw new ArgumentException("Entry price must be greater than 0");

                if (dto.ExitPrice <= 0)
                    throw new Exception("Exit price must be greater than 0");

                if (dto.LotSize <= 0)
                    throw new Exception("Lot size must be greater than 0");

                if (string.IsNullOrWhiteSpace(dto.Symbol))
                    throw new Exception("Symbol is required");

                if (string.IsNullOrWhiteSpace(dto.Strategy))
                    throw new Exception("Strategy is required");

                if (string.IsNullOrWhiteSpace(dto.Type))
                    throw new Exception("Type is required");

                if (string.IsNullOrWhiteSpace(dto.Time))
                    throw new Exception("Time is required");
            }

        public async Task AddTradeAsync(CreateTradeDto dto, string email)
        {
            

            ValidateTrade(dto); 

           _logger.LogInformation("Adding trade for {Symbol}", dto.Symbol);

           _logger.LogInformation("DTO Time: {Time}", dto.Time);  

            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null)
            {
                _logger.LogError("User not found for email: {Email}", email);
                throw new Exception("User not found");
            }
           var profitLoss = dto.Type == "BUY"
         ? (dto.ExitPrice - dto.EntryPrice) * dto.LotSize
        : (dto.EntryPrice - dto.ExitPrice) * dto.LotSize;

            var today = DateTime.UtcNow.Date;

            var parts = dto.Time.Split(':');
            int hour = int.Parse(parts[0]);
            int minute = int.Parse(parts[1]);

            var localTime = new DateTime(
                today.Year,
                today.Month,
                today.Day,
                hour,
                minute,
                0,
                DateTimeKind.Local
            );

            // Convert IST → UTC
            var tradeDateTime = localTime.ToUniversalTime();

            

            var trade = new Trade(
                dto.EntryPrice,
                dto.ExitPrice,
                dto.LotSize,
                dto.Strategy
            )
            {
                Type = dto.Type?.ToUpper() ?? "BUY",
                Symbol = dto.Symbol,
                TradeDate = tradeDateTime, 
               
            };
            trade.ProfitLoss = CalculatePnL(trade);

            await _repository.AddAsync(trade);
        }

    public async Task<List<TradeResponseDto>> GetAllTradesAsync()
    {
        


        var trades = await _repository.GetAllAsync();

        foreach (var t in trades)
        {
            
        }

        return trades.Select(t => new TradeResponseDto
        {
            
            EntryPrice = t.EntryPrice,
            ExitPrice = t.ExitPrice,
            LotSize = t.LotSize,
            Strategy = t.Strategy,
            Type = t.Type,
            TradeDate = t.TradeDate,
            Symbol = t.Symbol,
            ProfitLoss = t.ProfitLoss

        }).ToList();
    }
    public async Task<TradeSummaryDto> GetTradeSummaryAsync()
    {
        var trades = await _repository.GetAllAsync();

        var totalTrades = trades.Count;

        var totalProfit = trades
            .Where(t => t.ExitPrice > t.EntryPrice)
            .Sum(t => t.ExitPrice - t.EntryPrice);

        var totalLoss = trades
            .Where(t => t.ExitPrice < t.EntryPrice)
            .Sum(t => t.EntryPrice - t.ExitPrice);

        var netProfit = totalProfit - totalLoss;

        return new TradeSummaryDto
        {
            TotalTrades = totalTrades,
            TotalProfit = totalProfit,
            TotalLoss = totalLoss,
            NetProfit = netProfit
        };
    }
    public async Task<TradeWinRateDto> GetWinRateAsync()
    {
        var trades = await _repository.GetAllAsync();

        var totalTrades = trades.Count;

        var winningTrades = trades.Count(t => CalculatePnL(t) > 0);
        var losingTrades = trades.Count(t => CalculatePnL(t) < 0);

        double winRate = 0;

        if (totalTrades > 0)
        {
            winRate = (double)winningTrades / totalTrades * 100;
        }

        return new TradeWinRateDto
        {
            TotalTrades = totalTrades,
            WinningTrades = winningTrades,
            LosingTrades = losingTrades,
            WinRate = winRate
        };
    }
    public async Task<List<StrategyPerformanceDto>> GetStrategyPerformanceAsync()
    {
        var trades = await _repository.GetAllAsync();

        var grouped = trades
            .GroupBy(t => t.Strategy)
            .Select(group =>
            {
                var totalTrades = group.Count();

                var winningTrades = group.Count(t => t.ExitPrice > t.EntryPrice);

                var totalProfit = trades
                    .Where(t => t.ExitPrice > t.EntryPrice)
                    .Sum(t => (t.ExitPrice - t.EntryPrice) * t.LotSize);

                var totalLoss = trades
                    .Where(t => t.ExitPrice < t.EntryPrice)
                    .Sum(t => (t.EntryPrice - t.ExitPrice) * t.LotSize);

                var netProfit = totalProfit - totalLoss;

                var winRate = totalTrades > 0
                    ? (double)winningTrades / totalTrades * 100
                    : 0;

                return new StrategyPerformanceDto
                {
                    Strategy = group.Key,
                    TotalTrades = totalTrades,
                    WinRate = winRate,
                    NetProfit = netProfit
                };
            })
            .ToList();

        return grouped;
    }
    public async Task<PagedResponse<TradeResponseDto>> GetTradesAsync(string? strategy, int page, int pageSize, string? sortby, string? order, string? session)
        {
            var trades = await _repository.GetTradesAsync(strategy, page, pageSize, sortby, order, session );

            int totalCount = await _repository.GetCountAsync();
            
            var mappedTrades = trades.Select(t => new TradeResponseDto
                {
                    Id = t.Id,
                    EntryPrice = t.EntryPrice,
                    ExitPrice = t.ExitPrice,
                    LotSize = t.LotSize,
                    Strategy = t.Strategy,
                    Type = t.Type,
                    TradeDate = t.TradeDate,
                    Symbol = t.Symbol,
                    ProfitLoss = t.ProfitLoss
                }).ToList();

                return new PagedResponse<TradeResponseDto>
                {
                    Data = mappedTrades,
                    TotalCount = totalCount
                };
        }
    public async Task UpdateTradeAsync(int id, CreateTradeDto dto)
    {
        ValidateTrade(dto); 

        var trade = await _repository.GetByIdAsync(id);

        if (trade == null)
            throw new KeyNotFoundException("Trade not found");

        trade.Update(dto.EntryPrice, dto.ExitPrice, dto.LotSize, dto.Strategy);

        await _repository.UpdateAsync(trade);
    }
        public async Task DeleteTradeAsync(int id)
    {
        var trade = await _repository.GetByIdAsync(id);

        if (trade == null)
            throw new KeyNotFoundException("Trade not found");

        await _repository.DeleteAsync(id);
    }
    public async Task UpdatePartialAsync(int id, UpdateTradeDto dto)
    {
        var trade = await _repository.GetByIdAsync(id);

        if (trade == null)
            throw new KeyNotFoundException("Trade not found");

        // Update only provided fields
        if (dto.EntryPrice.HasValue)
            trade.EntryPrice = dto.EntryPrice.Value;

        if (dto.ExitPrice.HasValue)
            trade.ExitPrice = dto.ExitPrice.Value;

        if (dto.LotSize.HasValue)
            trade.LotSize = dto.LotSize.Value;

        if (!string.IsNullOrEmpty(dto.Strategy))
            trade.Strategy = dto.Strategy;

        await _repository.UpdateAsync(trade);
    }
    public async Task<TradeResponseDto> GetTradeByIdAsync(int id)
{
    var trade = await _repository.GetByIdAsync(id);

    if (trade == null)
        throw new KeyNotFoundException("Trade not found");

    return new TradeResponseDto
    {
        EntryPrice = trade.EntryPrice,
        ExitPrice = trade.ExitPrice,
        LotSize = trade.LotSize,
        Strategy = trade.Strategy,
        Type = trade.Type,
        TradeDate = trade.TradeDate,
        Symbol = trade.Symbol,
        ProfitLoss = trade.ProfitLoss
    };
}
                private double CalculatePnL(Trade t)
            {
                /*double tickSize = 0.0001;
                double tickValue = 10;

                // 🔥 Symbol-based config
                if (t.Symbol == "XAUUSD") // GOLD
                {
                    tickSize = 0.01;
                    tickValue = 1;
                }
                else if (t.Symbol == "XAGUSD") // SILVER
                {
                    tickSize = 0.01;
                    tickValue = 5;
                }

                double priceDiff = t.Type == "BUY"
                    ? (t.ExitPrice - t.EntryPrice)
                    : (t.EntryPrice - t.ExitPrice);

                double ticks = priceDiff / tickSize;

                return ticks * tickValue * t.LotSize;*/

                                double contractSize = 1;

                    // Normalize symbol (very important)
                    t.Symbol = t.Symbol.ToUpper();

                    // Contract size based on instrument
                    if (t.Symbol == "XAUUSD")
                        contractSize = 100;
                    else if (t.Symbol == "XAGUSD")
                        contractSize = 5000;
                    else if (t.Symbol == "EURUSD")
                        contractSize = 100000;
                    // extend later

                    double priceDifference;

                    // Handle BUY / SELL
                    if (t.Type == "BUY")
                        priceDifference = t.ExitPrice - t.EntryPrice;
                    else // SELL
                        priceDifference = t.EntryPrice - t.ExitPrice;

                    double PnL = priceDifference * t.LotSize * contractSize;

                    Console.WriteLine($"PnL Calculated: {PnL}");

                     return PnL;
            }



            public async Task<GlobalStatsDto> GetGlobalStats()
                {
                    var trades = await _repository.GetAllAsync();

                    double totalPnL = trades.Sum(t => CalculatePnL(t));
                    int wins = trades.Count(t => CalculatePnL(t) > 0);
                    int total = trades.Count;

                    double winRate = total == 0 ? 0 : (double)wins / total * 100;

                    return new GlobalStatsDto
                    {
                        TotalPnL = totalPnL,
                        WinRate = winRate
                    };
                }

public async Task UploadCsv(Stream stream)
{
    using var reader = new StreamReader(stream);
    using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

    var records = csv.GetRecords<TradeCsvDto>().ToList();

    var trades = new List<Trade>();

    foreach (var dto in records)
    {
        var trade = new Trade(
            dto.EntryPrice,
            dto.ExitPrice,
            dto.LotSize,
            dto.Symbol
        );

        trade.Type = dto.Type;
        trade.TradeDate = dto.TradeDate;
        trade.Strategy = dto.Strategy;
        trade.TradeDate = DateTime.SpecifyKind(dto.TradeDate, DateTimeKind.Utc);
        trade.ProfitLoss = CalculatePnL(trade);

        trades.Add(trade);
    }

    await _repository.AddRangeAsync(trades); 
}   /*      public async Task SeedTrades()
{
    var random = new Random();

    for (int i = 0; i < 100; i++)
    {
        var trade = new Trade
        {
            Symbol = i % 2 == 0 ? "XAUUSD" : "XAGUSD",
            Type = i % 2 == 0 ? "BUY" : "SELL",
            EntryPrice = random.Next(1900, 2000),
            ExitPrice = random.Next(1900, 2000),
            LotSize = Math.Round((double)(random.NextDouble() * 0.1), 2)
        };

        // ✅ Calculate PnL properly
        trade.ProfitLoss = CalculatePnL(trade);

        await _repository.AddAsync(trade);
    }
}*/

}