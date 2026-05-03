using Microsoft.EntityFrameworkCore;
namespace SmartTradeJournal.Infrastructure.Persistence.Entities;


[Index(nameof(Email), IsUnique = true)]
public class UserEntity
{
    public int Id { get; set; }

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public string Role { get; set; } = Roles.User;
    public List<TradeEntity> Trades { get; set; } = new();
}