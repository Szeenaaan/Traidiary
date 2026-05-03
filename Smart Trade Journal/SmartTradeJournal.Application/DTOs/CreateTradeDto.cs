namespace SmartTradeJournal.Application.DTOs;

public class CreateTradeDto
{
    public string Symbol { get; set; } = string.Empty;
    public double EntryPrice { get; set; }
    public double ExitPrice { get; set; }
    public double LotSize { get; set; }
    public string Strategy { get; set; } = string.Empty;
    public DateTime TradeDate { get; set; }
    public required string Time { get; set; }
    public string Type { get; set; } = "BUY";
}