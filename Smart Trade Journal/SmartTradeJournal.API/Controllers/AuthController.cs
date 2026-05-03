using Microsoft.AspNetCore.Mvc;
using SmartTradeJournal.Application.Interfaces;
using SmartTradeJournal.Application.DTOs;
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    // 🔐 LOGIN
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var token = await _authService.Login(dto);

        return Ok(new
        {
            token
        });
    }

    // 📝 REGISTER
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        await _authService.Register(dto);

        return Ok(new
        {
            message = "User registered successfully"
        });
    }
}