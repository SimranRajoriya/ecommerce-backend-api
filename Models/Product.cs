using System.ComponentModel.DataAnnotations;

namespace ECommerceBackend.Models;

public class Product
{
    public int Id { get; set; }

    [MaxLength(140)]
    public required string Name { get; set; }

    [MaxLength(1000)]
    public string? Description { get; set; }

    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    public int CategoryId { get; set; }
    public Category? Category { get; set; }
    public List<ProductImage> Images { get; set; } = [];
}
