namespace ECommerceBackend.Models;

public record ApiResponse<T>(bool Success, string Message, T? Data);

public record PagedResult<T>(
    IReadOnlyList<T> Items,
    int PageNumber,
    int PageSize,
    int TotalCount)
{
    public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);
}
