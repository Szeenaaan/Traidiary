namespace SmartTradeJournal.Application.DTOs;

public class TradeSummaryDto
{
    public int TotalTrades { get; set; }

    public double TotalProfit { get; set; }

    public double TotalLoss { get; set; }

    public double NetProfit { get; set; }
}