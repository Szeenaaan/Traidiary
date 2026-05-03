namespace SmartTradeJournal.Application.DTOs;   

public class PagedResponse<T>
{
    public List<T> Data { get; set; } = new List<T>(); 
    public int TotalCount { get; set; }
}