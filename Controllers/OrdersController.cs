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
[Authorize(Policy = "CustomerOrAdmin")]
public class OrdersController(AppDbContext db, IEmailService emailService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<OrderResponse>>>> GetMyOrders()
    {
        var userId = CurrentUserId();
        var isAdmin = User.IsInRole("Admin");

        var orders = await db.Orders
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .Where(x => isAdmin || x.UserId == userId)
            .OrderByDescending(x => x.OrderedAtUtc)
            .ToListAsync();

        return Ok(new ApiResponse<List<OrderResponse>>(true, "Orders loaded.", orders.Select(ToResponse).ToList()));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<OrderResponse>>> Create(CreateOrderRequest request)
    {
        var productIds = request.Items.Select(x => x.ProductId).Distinct().ToList();
        var products = await db.Products.Where(x => productIds.Contains(x.Id) && x.IsActive).ToListAsync();

        if (products.Count != productIds.Count)
        {
            return BadRequest(new ApiResponse<object>(false, "One or more products are invalid.", null));
        }

        var order = new Order
        {
            UserId = CurrentUserId(),
            ShippingAddress = request.ShippingAddress.Trim(),
            Status = "Pending"
        };

        foreach (var item in request.Items)
        {
            var product = products.Single(x => x.Id == item.ProductId);
            if (product.StockQuantity < item.Quantity)
            {
                return BadRequest(new ApiResponse<object>(false, $"Insufficient stock for {product.Name}.", null));
            }

            product.StockQuantity -= item.Quantity;
            order.Items.Add(new OrderItem
            {
                ProductId = product.Id,
                Quantity = item.Quantity,
                UnitPrice = product.Price,
                LineTotal = product.Price * item.Quantity
            });
        }

        order.TotalAmount = order.Items.Sum(x => x.LineTotal);
        db.Orders.Add(order);
        await db.SaveChangesAsync();

        var user = await db.Users.FindAsync(order.UserId);
        if (user is not null)
        {
            await emailService.SendAsync(user.Email, $"Order #{order.Id} placed", $"<p>Your order total is {order.TotalAmount:C}.</p>");
        }

        return CreatedAtAction(nameof(GetMyOrders), new ApiResponse<OrderResponse>(true, "Order created.", ToResponse(order)));
    }

    [HttpPatch("{id:int}/status")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<ApiResponse<OrderResponse>>> UpdateStatus(int id, UpdateOrderStatusRequest request)
    {
        var order = await db.Orders.Include(x => x.Items).ThenInclude(x => x.Product).Include(x => x.User).FirstOrDefaultAsync(x => x.Id == id);
        if (order is null)
        {
            return NotFound(new ApiResponse<object>(false, "Order not found.", null));
        }

        order.Status = request.Status.Trim();
        await db.SaveChangesAsync();

        if (order.User is not null)
        {
            await emailService.SendAsync(order.User.Email, $"Order #{order.Id} status updated", $"<p>Your order status is now <strong>{order.Status}</strong>.</p>");
        }

        return Ok(new ApiResponse<OrderResponse>(true, "Order status updated.", ToResponse(order)));
    }

    private int CurrentUserId() => int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);

    private static OrderResponse ToResponse(Order order) =>
        new(
            order.Id,
            order.OrderedAtUtc,
            order.TotalAmount,
            order.Status,
            order.ShippingAddress,
            order.Items.Select(x => new OrderItemResponse(x.ProductId, x.Product?.Name ?? "Unknown", x.Quantity, x.UnitPrice, x.LineTotal)).ToList());
}
