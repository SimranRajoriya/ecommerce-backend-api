using System.ComponentModel.DataAnnotations;

namespace ECommerceBackend.DTOs;

public record CreateOrderRequest(
    [Required, MaxLength(500)] string ShippingAddress,
    [MinLength(1)] List<CreateOrderItemRequest> Items);

public record CreateOrderItemRequest(
    [Range(1, int.MaxValue)] int ProductId,
    [Range(1, 100)] int Quantity);

public record UpdateOrderStatusRequest([Required, MaxLength(30)] string Status);

public record OrderResponse(
    int Id,
    DateTime OrderedAtUtc,
    decimal TotalAmount,
    string Status,
    string ShippingAddress,
    IReadOnlyList<OrderItemResponse> Items);

public record OrderItemResponse(int ProductId, string ProductName, int Quantity, decimal UnitPrice, decimal LineTotal);
