using System.ComponentModel.DataAnnotations;

namespace ECommerceBackend.Models;

public class Order
{
    public int Id { get; set; }
    public DateTime OrderedAtUtc { get; set; } = DateTime.UtcNow;
    public decimal TotalAmount { get; set; }

    [MaxLength(30)]
    public string Status { get; set; } = "Pending";

    [MaxLength(500)]
    public required string ShippingAddress { get; set; }

    public int UserId { get; set; }
    public User? User { get; set; }
    public List<OrderItem> Items { get; set; } = [];
}
