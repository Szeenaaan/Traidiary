using Microsoft.EntityFrameworkCore;
using SmartTradeJournal.Domain.Entities;
using SmartTradeJournal.Domain.Interfaces;
using SmartTradeJournal.Infrastructure.Persistence.Dbcontext;
using SmartTradeJournal.Infrastructure.Persistence.Entities;
public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(User user)
{
    var entity = new UserEntity
    {
        Email = user.Email,
        PasswordHash = user.PasswordHash,
        Role = user.Role
    };

    await _context.Users.AddAsync(entity);
    await _context.SaveChangesAsync();
}

    public async Task<User?> GetByEmailAsync(string email)
{
    var entity = await _context.Users
        .FirstOrDefaultAsync(u => u.Email == email);

    if (entity == null) return null;

    return new User
    {
        Id = entity.Id,
        Email = entity.Email,
        PasswordHash = entity.PasswordHash,
        Role = entity.Role
    };
}
}