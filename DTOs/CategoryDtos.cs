using System.ComponentModel.DataAnnotations;

namespace ECommerceBackend.DTOs;

public record CategoryRequest(
    [Required, MaxLength(80)] string Name,
    [MaxLength(300)] string? Description,
    bool IsActive = true);

public record CategoryResponse(int Id, string Name, string? Description, bool IsActive);
