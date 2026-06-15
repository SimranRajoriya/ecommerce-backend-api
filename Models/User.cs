using System.ComponentModel.DataAnnotations;

namespace ECommerceBackend.Models;

public class User
{
    public int Id { get; set; }

    [MaxLength(120)]
    public required string FullName { get; set; }

    [MaxLength(160)]
    public required string Email { get; set; }

    public required string PasswordHash { get; set; }

    [MaxLength(30)]
    public string Role { get; set; } = "Customer";

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public List<RefreshToken> RefreshTokens { get; set; } = [];
    public List<Order> Orders { get; set; } = [];
}
