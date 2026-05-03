using SmartTradeJournal.Domain.Entities;
namespace SmartTradeJournal.Domain.Interfaces
{
public interface IUserRepository
{
    Task AddAsync(User user);

    Task<User?> GetByEmailAsync(string email);
}
}