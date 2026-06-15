using System.ComponentModel.DataAnnotations;

namespace ECommerceBackend.Models;

public class RefreshToken
{
    public int Id { get; set; }

    [MaxLength(256)]
    public required string Token { get; set; }

    public DateTime ExpiresAtUtc { get; set; }
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime? RevokedAtUtc { get; set; }
    public bool IsActive => RevokedAtUtc is null && DateTime.UtcNow < ExpiresAtUtc;

    public int UserId { get; set; }
    public User? User { get; set; }
}
