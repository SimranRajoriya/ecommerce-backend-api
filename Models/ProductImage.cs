using System.ComponentModel.DataAnnotations;

namespace ECommerceBackend.Models;

public class ProductImage
{
    public int Id { get; set; }

    [MaxLength(500)]
    public required string Url { get; set; }

    [MaxLength(180)]
    public required string FileName { get; set; }

    public DateTime UploadedAtUtc { get; set; } = DateTime.UtcNow;
    public int ProductId { get; set; }
    public Product? Product { get; set; }
}
