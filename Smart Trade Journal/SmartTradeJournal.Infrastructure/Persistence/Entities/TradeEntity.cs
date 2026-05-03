using SmartTradeJournal.Domain.Entities;
namespace SmartTradeJournal.Infrastructure.Persistence.Entities;

public class TradeEntity
{
    public int Id { get; set; }
    public int UserId { get; set; }   // FK
    public UserEntity? User { get; set; }
    public string Symbol { get; set; } = "EURUSD";

    public decimal EntryPrice { get; set; }

    public decimal ExitPrice { get; set; }

    public decimal LotSize { get; set; }

    public decimal ProfitLoss { get; set; }

    public DateTime TradeDate { get; set; }

    public string Strategy { get; set; } = string.Empty;

    public string Type { get; set; } = "BUY";

}