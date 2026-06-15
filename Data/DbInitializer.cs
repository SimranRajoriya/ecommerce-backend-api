using ECommerceBackend.Models;
using ECommerceBackend.Services;
using Microsoft.EntityFrameworkCore;

namespace ECommerceBackend.Data;

public static class DbInitializer
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var passwordService = scope.ServiceProvider.GetRequiredService<IPasswordService>();
        var logger = scope.ServiceProvider.GetRequiredService<ILoggerFactory>().CreateLogger("DbInitializer");

        try
        {
            if (db.Database.IsRelational())
            {
                await db.Database.MigrateAsync();
            }

            if (!await db.Users.AnyAsync(user => user.Email == "admin@ecommerce.com"))
            {
                db.Users.Add(new User
                {
                    FullName = "System Admin",
                    Email = "admin@ecommerce.com",
                    PasswordHash = passwordService.HashPassword("Admin@123"),
                    Role = "Admin"
                });
            }

            if (!await db.Categories.AnyAsync())
            {
                db.Categories.AddRange(
                    new Category { Name = "Mobiles", Description = "Smartphones and mobile accessories" },
                    new Category { Name = "Fashion", Description = "Clothing, shoes and lifestyle products" },
                    new Category { Name = "Electronics", Description = "Laptops, cameras and gadgets" });
            }

            await db.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Database seed skipped. Check SQL Server connection string if running locally.");
        }
    }
}
