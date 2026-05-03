public class UpdateTradeDto
{
    public string Symbol { get; set; } = "EURUSD";
    public double? EntryPrice { get; set; }
    public double? ExitPrice { get; set; }
    public double? LotSize { get; set; }
    public string? Strategy { get; set; }
}