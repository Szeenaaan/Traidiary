using SmartTradeJournal.Domain.Entities;

namespace SmartTradeJournal.Domain.Interfaces;

public interface ITradeRepository
{
    Task AddAsync(Trade trade);
    Task<List<Trade>> GetAllAsync();
    Task<Trade?> GetByIdAsync(int id);
    Task UpdateAsync(Trade trade);
    Task<List<Trade>> GetTradesAsync(string? strategy, int page, int pageSize, string? sortby, string? order, string? session);
    Task DeleteAsync(int id);
    Task<int> GetCountAsync();
    Task AddRangeAsync(List<Trade> trades);
}