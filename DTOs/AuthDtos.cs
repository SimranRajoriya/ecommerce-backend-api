using System.ComponentModel.DataAnnotations;

namespace ECommerceBackend.DTOs;

public record RegisterRequest(
    [Required, MaxLength(120)] string FullName,
    [Required, EmailAddress, MaxLength(160)] string Email,
    [Required, MinLength(6)] string Password);

public record LoginRequest(
    [Required, EmailAddress] string Email,
    [Required] string Password);

public record RefreshTokenRequest([Required] string RefreshToken);

public record AuthResponse(
    int UserId,
    string FullName,
    string Email,
    string Role,
    string AccessToken,
    DateTime AccessTokenExpiresAtUtc,
    string RefreshToken,
    DateTime RefreshTokenExpiresAtUtc);
