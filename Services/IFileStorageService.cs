namespace ECommerceBackend.Services;

public interface IFileStorageService
{
    Task<(string FileName, string Url)> SaveProductImageAsync(IFormFile file, CancellationToken cancellationToken = default);
}
