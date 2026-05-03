using Microsoft.EntityFrameworkCore;
using SmartTradeJournal.Domain.Entities;
using SmartTradeJournal.Domain.Interfaces;
using SmartTradeJournal.Infrastructure.Persistence.Dbcontext;
using SmartTradeJournal.Infrastructure.Persistence.Entities;
using Microsoft.Extensions.Logging;
namespace SmartTradeJournal.Infrastructure.Persistence.Repositories;

public class TradeRepository : ITradeRepository
{
    private readonly AppDbContext _context;
    private readonly ILogger<TradeRepository> _logger;

    public TradeRepository(AppDbContext context, ILogger<TradeRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task AddAsync(Trade trade)
{
    _logger.LogInformation("Saving trade to database");

    var entity = new TradeEntity
    {
        EntryPrice = (decimal)trade.EntryPrice,
        ExitPrice = (decimal)trade.ExitPrice,
        LotSize = (decimal)trade.LotSize,
        Strategy = trade.Strategy,
        Type = trade.Type,
        Symbol = trade.Symbol,
        TradeDate = trade.TradeDate,
        ProfitLoss = (decimal)trade.ProfitLoss
    };
    Console.WriteLine($"Saving PnL: {trade.ProfitLoss}");

    await _context.Trades.AddAsync(entity);
    await _context.SaveChangesAsync();   // ❗ MUST EXIST
}
    public async Task<List<Trade>> GetAllAsync()
    {
    

        var entities = await _context.Trades.ToListAsync();

        return entities.Select(e => new Trade(
            (double)e.EntryPrice,
            (double)e.ExitPrice,
            (double)e.LotSize,
            e.Strategy
            )
            {
                Id = e.Id,
                Type = e.Type,
                Symbol = e.Symbol,              
                TradeDate = e.TradeDate,
                ProfitLoss = (double)e.ProfitLoss
            }
        ).ToList();
    }

    public async Task<Trade?> GetByIdAsync(int id)
    {
        var entity = await _context.Trades.FindAsync(id);

        if (entity == null) return null;

        return new Trade(
            (double)entity.EntryPrice,
            (double)entity.ExitPrice,
            (double)entity.LotSize,
            entity.Strategy
        )
        {
            Id = entity.Id,
            Type = entity.Type ,
            Symbol = entity.Symbol,
            TradeDate = entity.TradeDate,

            ProfitLoss = (double)entity.ProfitLoss
        };
    }
   
   
        public async Task<List<Trade>> GetTradesAsync(
                            string? strategy,
                            int page,
                            int pageSize,
                            string? sortby,
                            string? order,
                            string? session)
                        {
                            var query = _context.Trades.AsQueryable();

                            // ✅ 1. FILTER (DB LEVEL)
                            if (!string.IsNullOrEmpty(strategy))
                            {
                                query = query.Where(t => t.Strategy.ToLower() == strategy.ToLower());
                            }

                            // ⚠️ Session filter can't be translated to SQL easily
                            // so we apply it AFTER fetching but BEFORE pagination

                            var entities = await query.ToListAsync();

                            // ✅ 2. SESSION FILTER (IN MEMORY)
                            if (!string.IsNullOrEmpty(session))
                            {
                                entities = entities.Where(t =>
                                {
                                    var time = t.TradeDate.ToLocalTime();
                                    var totalMinutes = time.Hour * 60 + time.Minute;

                                    return session.ToLower() switch
                                    {
                                        "asian" => totalMinutes >= 330 && totalMinutes < 870,
                                        "london" => totalMinutes >= 810 && totalMinutes < 1350,
                                        "newyork" => totalMinutes >= 1110 || totalMinutes < 210,
                                        "london_ny" => totalMinutes >= 1110 && totalMinutes < 1350,
                                        "asian_london" => totalMinutes >= 810 && totalMinutes < 870,
                                        _ => true
                                    };
                                }).ToList();
                            }

                            // ✅ 3. SORT (IN MEMORY now)
                            if (!string.IsNullOrEmpty(sortby))
                            {
                                entities = sortby.ToLower() switch
                                {
                                    "entryprice" => order == "desc"
                                        ? entities.OrderByDescending(t => t.EntryPrice).ToList()
                                        : entities.OrderBy(t => t.EntryPrice).ToList(),

                                    "exitprice" => order == "desc"
                                        ? entities.OrderByDescending(t => t.ExitPrice).ToList()
                                        : entities.OrderBy(t => t.ExitPrice).ToList(),

                                    "lotsize" => order == "desc"
                                        ? entities.OrderByDescending(t => t.LotSize).ToList()
                                        : entities.OrderBy(t => t.LotSize).ToList(),

                                    _ => entities
                                };
                            }

                            // ✅ 4. PAGINATION (LAST STEP)
                            var paginated = entities
                                .Skip((page - 1) * pageSize)
                                .Take(pageSize)
                                .ToList();

                            // ✅ 5. MAPPING
                            return paginated.Select(e => new Trade(
                                (double)e.EntryPrice,
                                (double)e.ExitPrice,
                                (double)e.LotSize,
                                e.Symbol
                            )
                            {
                                Id = e.Id,
                                Type = e.Type,
                                TradeDate = e.TradeDate,
                                Strategy = e.Strategy,
                                ProfitLoss = (double)e.ProfitLoss
                            }).ToList();
                        }
                            
        public async Task UpdateAsync(Trade trade)
    {
        var entity = await _context.Trades.FindAsync(trade.Id);

        if (entity == null) return;

        entity.EntryPrice = (decimal)trade.EntryPrice;
        entity.ExitPrice = (decimal)trade.ExitPrice;
        entity.LotSize = (decimal)trade.LotSize;
        entity.Strategy = trade.Strategy;
        entity.Type = trade.Type;
        
        await _context.SaveChangesAsync();
    }
    public async Task DeleteAsync(int id)
    {
        var entity = await _context.Trades.FindAsync(id);

        if (entity == null) return;

        _context.Trades.Remove(entity);
        await _context.SaveChangesAsync();
    }
    public async Task<int> GetCountAsync()
    {
        return await _context.Trades.CountAsync();
    }
public async Task AddRangeAsync(List<Trade> trades)
{
    var entities = trades.Select(t => new TradeEntity
    {
        EntryPrice = (decimal)t.EntryPrice,
        ExitPrice = (decimal)t.ExitPrice,
        LotSize = (decimal)t.LotSize,
        Symbol = t.Symbol,
        Type = t.Type,
        TradeDate = t.TradeDate,
        Strategy = t.Strategy,
        ProfitLoss = (decimal)t.ProfitLoss
    }).ToList();

    await _context.Trades.AddRangeAsync(entities);
    await _context.SaveChangesAsync();
}
}