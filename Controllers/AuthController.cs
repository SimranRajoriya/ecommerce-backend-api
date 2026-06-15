using ECommerceBackend.Data;
using ECommerceBackend.DTOs;
using ECommerceBackend.Models;
using ECommerceBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(
    AppDbContext db,
    IPasswordService passwordService,
    IJwtTokenService jwtTokenService,
    IEmailService emailService) : ControllerBase
{
    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<AuthResponse>>> Register(RegisterRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        if (await db.Users.AnyAsync(user => user.Email == email))
        {
            return Conflict(new ApiResponse<object>(false, "Email already exists.", null));
        }

        var user = new User
        {
            FullName = request.FullName.Trim(),
            Email = email,
            PasswordHash = passwordService.HashPassword(request.Password),
            Role = "Customer"
        };

        db.Users.Add(user);
        await db.SaveChangesAsync();

        await emailService.SendAsync(user.Email, "Welcome to E-Commerce Store", $"<p>Hello {user.FullName}, your account has been created.</p>");

        var response = await CreateAuthResponseAsync(user);
        return CreatedAtAction(nameof(Me), new { id = user.Id }, new ApiResponse<AuthResponse>(true, "Registration successful.", response));
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<AuthResponse>>> Login(LoginRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var user = await db.Users.Include(x => x.RefreshTokens).FirstOrDefaultAsync(x => x.Email == email);

        if (user is null || !passwordService.VerifyPassword(request.Password, user.PasswordHash))
        {
            return Unauthorized(new ApiResponse<object>(false, "Invalid email or password.", null));
        }

        return Ok(new ApiResponse<AuthResponse>(true, "Login successful.", await CreateAuthResponseAsync(user)));
    }

    [HttpPost("refresh")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<AuthResponse>>> Refresh(RefreshTokenRequest request)
    {
        var token = await db.RefreshTokens.Include(x => x.User).FirstOrDefaultAsync(x => x.Token == request.RefreshToken);
        if (token?.User is null || !token.IsActive)
        {
            return Unauthorized(new ApiResponse<object>(false, "Invalid refresh token.", null));
        }

        token.RevokedAtUtc = DateTime.UtcNow;
        return Ok(new ApiResponse<AuthResponse>(true, "Token refreshed.", await CreateAuthResponseAsync(token.User)));
    }

    [HttpPost("revoke")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<object>>> Revoke(RefreshTokenRequest request)
    {
        var token = await db.RefreshTokens.FirstOrDefaultAsync(x => x.Token == request.RefreshToken);
        if (token is null)
        {
            return NotFound(new ApiResponse<object>(false, "Refresh token not found.", null));
        }

        token.RevokedAtUtc = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return Ok(new ApiResponse<object>(true, "Refresh token revoked.", null));
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<object>>> Me()
    {
        var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);
        var user = await db.Users.FindAsync(userId);
        return Ok(new ApiResponse<object>(true, "Current user.", new { user!.Id, user.FullName, user.Email, user.Role }));
    }

    private async Task<AuthResponse> CreateAuthResponseAsync(User user)
    {
        var accessToken = jwtTokenService.CreateAccessToken(user);
        var refreshToken = jwtTokenService.CreateRefreshToken();

        db.RefreshTokens.Add(new RefreshToken
        {
            Token = refreshToken.Token,
            ExpiresAtUtc = refreshToken.ExpiresAtUtc,
            UserId = user.Id
        });

        await db.SaveChangesAsync();

        return new AuthResponse(user.Id, user.FullName, user.Email, user.Role, accessToken.Token, accessToken.ExpiresAtUtc, refreshToken.Token, refreshToken.ExpiresAtUtc);
    }
}
