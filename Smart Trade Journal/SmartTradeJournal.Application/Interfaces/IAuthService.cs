using SmartTradeJournal.Application.DTOs;
namespace SmartTradeJournal.Application.Interfaces;
public interface IAuthService
{
    Task Register(RegisterDto dto);
    Task<string> Login(LoginDto dto);
}