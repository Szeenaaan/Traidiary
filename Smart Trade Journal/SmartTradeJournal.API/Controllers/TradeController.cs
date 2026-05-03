using Microsoft.AspNetCore.Mvc;
using SmartTradeJournal.Application.DTOs;
using SmartTradeJournal.Application.Interfaces;
using SmartTradeJournal.Application.Common;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace SmartTradeJournal.API.Controllers;
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TradeController : ControllerBase
{
    private readonly ITradeService _tradeService;
    
    public TradeController(ITradeService tradeService)
    {
        _tradeService = tradeService;
    }

[HttpPost]
public async Task<IActionResult> AddTrade([FromBody] CreateTradeDto dto)
{
    var email = User.FindFirst(ClaimTypes.Email)?.Value;

    if (string.IsNullOrEmpty(email))
        return Unauthorized();

    await _tradeService.AddTradeAsync(dto, email);

    return Ok(new ApiResponse<object>(
        true,
        "Trade added successfully",
        null
    ));
}
  [HttpGet]
        public async Task<IActionResult> GetTrades(
            
            [FromQuery] string? strategy,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? sortBy = null,
            [FromQuery] string? order = "asc",
            [FromQuery] string? session = null)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            var trades = await _tradeService.GetTradesAsync(strategy, page, pageSize, sortBy, order, session);

            return Ok(new ApiResponse<object>(
                true,
                "Trades fetched successfully",   
                trades                           
            ));
        }
   
        [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        var summary = await _tradeService.GetTradeSummaryAsync();

        return Ok(new ApiResponse<object>(
            true,
            "Summary fetched successfully",
            summary
        ));
    }
     [HttpGet("winrate")]
    public async Task<IActionResult> GetWinRate()
    {
        var result = await _tradeService.GetWinRateAsync();

        return Ok(new ApiResponse<object>(
            true,
            "Win rate calculated successfully",
            result
        ));
    }
    [HttpGet("strategy-performance")]
    public async Task<IActionResult> GetStrategyPerformance()
    {
        var result = await _tradeService.GetStrategyPerformanceAsync();

        return Ok(new ApiResponse<object>(
            true,
            "Strategy performance fetched successfully",
            result
        ));
    }

      
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTrade(int id, [FromBody] CreateTradeDto dto)
    {
        await _tradeService.UpdateTradeAsync(id, dto);

        return Ok(new ApiResponse<object>(
            true,
            "Trade updated successfully",
            null
        ));
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTrade(int id)
    {
        await _tradeService.DeleteTradeAsync(id);

        return Ok(new ApiResponse<object>(
            true,
            "Trade deleted successfully",
            null
        ));
    }
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdatePartial(int id, [FromBody] UpdateTradeDto dto)
    {
        await _tradeService.UpdatePartialAsync(id, dto);

        return Ok(new ApiResponse<object>(
            true,
            "Trade updated successfully",
            null
        ));
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetTradeById(int id)
    {
        var trade = await _tradeService.GetTradeByIdAsync(id);

        return Ok(new ApiResponse<object>(
            true,
            "Trade fetched successfully",
            trade
        ));
    }
    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    
    {
        

        var stats = await _tradeService.GetGlobalStats();
        return Ok(stats);
    }
   /* [HttpPost("seed")]
public async Task<IActionResult> Seed()
{
    await _tradeService.SeedTrades();
    return Ok("100 trades inserted");
}*/
[HttpPost("upload-csv")]
public async Task<IActionResult> UploadCsv(IFormFile file)
{
    using var stream = file.OpenReadStream();
    await _tradeService.UploadCsv(stream);
    return Ok();
}
}