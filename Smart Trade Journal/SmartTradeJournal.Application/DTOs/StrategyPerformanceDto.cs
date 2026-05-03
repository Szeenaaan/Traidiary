namespace SmartTradeJournal.Application.DTOs;

public class StrategyPerformanceDto
{
    public string Strategy { get; set; } = string.Empty;

    public int TotalTrades { get; set; }

    public double WinRate { get; set; }

    public double NetProfit { get; set; }
}