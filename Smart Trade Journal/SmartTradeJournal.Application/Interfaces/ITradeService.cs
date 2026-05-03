using SmartTradeJournal.Application.DTOs;

namespace SmartTradeJournal.Application.Interfaces;

public interface ITradeService
{
    Task AddTradeAsync(CreateTradeDto dto, string email);
    Task<TradeSummaryDto> GetTradeSummaryAsync();
    Task<TradeWinRateDto> GetWinRateAsync();
    Task<List<StrategyPerformanceDto>> GetStrategyPerformanceAsync();
    Task<PagedResponse<TradeResponseDto>> GetTradesAsync(string? strategy, int page, int pageSize, string? sortBy, string? order, string? session);
    Task UpdateTradeAsync(int id, CreateTradeDto dto);
    Task DeleteTradeAsync(int id);
    Task UpdatePartialAsync(int id, UpdateTradeDto dto);
    Task<TradeResponseDto> GetTradeByIdAsync(int id);
     Task<GlobalStatsDto> GetGlobalStats(); 
     Task UploadCsv(Stream stream);

 //   Task SeedTrades();

}