using SmartTradeJournal.Application.DTOs;
using SmartTradeJournal.Domain.Entities;
using SmartTradeJournal.Application.Interfaces;
using SmartTradeJournal.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Configuration;


namespace SmartTradeJournal.Application.Services;


public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository ;
    private readonly IConfiguration _configuration;    
    private readonly PasswordHasher<User> _passwordHasher = new();

    public AuthService(IUserRepository userRepository, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _configuration = configuration;
    }

    public async Task Register(RegisterDto dto)
    {
        var user = new User
        {
            Email = dto.Email,
            
            Role = Roles.User
        };
        user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);
        await _userRepository.AddAsync(user);
    }
  public async Task<string> Login(LoginDto dto)
{
    var user = await _userRepository.GetByEmailAsync(dto.Email);

    if (user == null)
        throw new Exception("User not found");

    var result = _passwordHasher.VerifyHashedPassword(
        user,
        user.PasswordHash,
        dto.Password
    );

    if (result == PasswordVerificationResult.Failed)
        throw new Exception("Invalid password");

    // 🔥 ADD YOUR CODE HERE
    var key = _configuration["Jwt:Key"];

    if (string.IsNullOrEmpty(key))
    {
        throw new Exception("JWT Key is missing in configuration");
    }

    var keyBytes = Encoding.UTF8.GetBytes(key);

    // continue JWT creation
    var securityKey = new SymmetricSecurityKey(keyBytes);
    var creds = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

    var claims = new[]
    {
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role)
    };

    var token = new JwtSecurityToken(
        issuer: _configuration["Jwt:Issuer"],
        audience: _configuration["Jwt:Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddHours(2),
        signingCredentials: creds
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}
}