namespace SmartTradeJournal.Domain.Entities;

public class User
{
    public int Id { get; set; }

    public required string Email { get; set; }

    public string PasswordHash { get; set; } = string.Empty;

    public string Role { get; set; } = Roles.User;

    
}