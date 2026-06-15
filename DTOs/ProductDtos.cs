using System.ComponentModel.DataAnnotations;

namespace ECommerceBackend.DTOs;

public record ProductQuery(
    string? Search,
    int? CategoryId,
    decimal? MinPrice,
    decimal? MaxPrice,
    bool? IsActive,
    int PageNumber = 1,
    int PageSize = 10);

public record ProductRequest(
    [Required, MaxLength(140)] string Name,
    [MaxLength(1000)] string? Description,
    [Range(0.01, 999999)] decimal Price,
    [Range(0, int.MaxValue)] int StockQuantity,
    [Range(1, int.MaxValue)] int CategoryId,
    bool IsActive = true);

public record ProductResponse(
    int Id,
    string Name,
    string? Description,
    decimal Price,
    int StockQuantity,
    bool IsActive,
    int CategoryId,
    string? CategoryName,
    IReadOnlyList<string> ImageUrls);
