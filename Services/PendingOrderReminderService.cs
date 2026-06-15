using ECommerceBackend.Data;
using Microsoft.EntityFrameworkCore;

namespace ECommerceBackend.Services;

public class PendingOrderReminderService(IServiceScopeFactory scopeFactory, ILogger<PendingOrderReminderService> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(TimeSpan.FromHours(6));

        while (!stoppingToken.IsCancellationRequested && await timer.WaitForNextTickAsync(stoppingToken))
        {
            using var scope = scopeFactory.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var email = scope.ServiceProvider.GetRequiredService<IEmailService>();

            var cutoff = DateTime.UtcNow.AddHours(-24);
            var pendingOrders = await db.Orders
                .Include(order => order.User)
                .Where(order => order.Status == "Pending" && order.OrderedAtUtc <= cutoff)
                .Take(20)
                .ToListAsync(stoppingToken);

            foreach (var order in pendingOrders)
            {
                if (order.User is null)
                {
                    continue;
                }

                await email.SendAsync(
                    order.User.Email,
                    $"Order #{order.Id} is still pending",
                    $"<p>Hello {order.User.FullName}, your order #{order.Id} is still pending. We will update you soon.</p>",
                    stoppingToken);
            }

            logger.LogInformation("Pending order reminder job checked {Count} orders.", pendingOrders.Count);
        }
    }
}
