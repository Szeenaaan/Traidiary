namespace SmartTradeJournal.Domain.Entities;

public class Trade
{
    
    public int Id { get; set; } 
    public int UserId { get; set; }
    public string Symbol { get; set; } = "EURUSD";
    public double EntryPrice { get;  set; }
    public double ExitPrice { get;  set; }
    public double LotSize { get;  set; }
    public string Strategy { get;  set; }
    public DateTime TradeDate { get; set; } = DateTime.UtcNow;

    public double ProfitLoss { get; set; }
    public string Type { get; set; } = "BUY";  // BUY or SELL
    public Trade(double entryPrice, double exitPrice, double lotSize, string strategy)
    {
        EntryPrice = entryPrice;
        ExitPrice = exitPrice;
        LotSize = lotSize;
        Strategy = strategy;
        TradeDate = DateTime.UtcNow;
        
    }
    public void Update(double entryPrice, double exitPrice, double lotSize, string strategy)
    {
        EntryPrice = entryPrice;
        ExitPrice = exitPrice;
        LotSize = lotSize;
        Strategy = strategy;
    }
    
}