namespace SmartTradeJournal.Application.DTOs
{
public class TradeCsvDto
{
    public double EntryPrice { get; set; }
    public double ExitPrice { get; set; }
    public double LotSize { get; set; }
    public string Symbol { get; set; }="EURUSD";
    public DateTime TradeDate { get; set; } = DateTime.UtcNow;
    public string Strategy { get; set; }= "Default";
    public string Type { get; set; }= "BUY";  // BUY or SELL
}
}