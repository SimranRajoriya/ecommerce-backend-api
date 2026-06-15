using ECommerceBackend.Models;

namespace ECommerceBackend.Services;

public interface IJwtTokenService
{
    (string Token, DateTime ExpiresAtUtc) CreateAccessToken(User user);
    (string Token, DateTime ExpiresAtUtc) CreateRefreshToken();
}
