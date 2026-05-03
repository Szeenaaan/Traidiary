using Microsoft.EntityFrameworkCore;
using SmartTradeJournal.Infrastructure.Persistence.Entities;

namespace SmartTradeJournal.Infrastructure.Persistence.Dbcontext;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<TradeEntity> Trades { get; set; } = null!;
    public DbSet<UserEntity> Users { get; set; } = null!;

    
}