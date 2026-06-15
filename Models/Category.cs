using System.ComponentModel.DataAnnotations;

namespace ECommerceBackend.Models;

public class Category
{
    public int Id { get; set; }

    [MaxLength(80)]
    public required string Name { get; set; }

    [MaxLength(300)]
    public string? Description { get; set; }

    public bool IsActive { get; set; } = true;
    public List<Product> Products { get; set; } = [];
}
