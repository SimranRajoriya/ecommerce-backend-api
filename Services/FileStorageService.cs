namespace ECommerceBackend.Services;

public class FileStorageService(IWebHostEnvironment environment) : IFileStorageService
{
    private static readonly string[] AllowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

    public async Task<(string FileName, string Url)> SaveProductImageAsync(IFormFile file, CancellationToken cancellationToken = default)
    {
        if (file.Length == 0)
        {
            throw new InvalidOperationException("Uploaded file is empty.");
        }

        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!AllowedExtensions.Contains(extension))
        {
            throw new InvalidOperationException("Only .jpg, .jpeg, .png and .webp files are allowed.");
        }

        var fileName = $"{Guid.NewGuid():N}{extension}";
        var uploadsPath = Path.Combine(environment.WebRootPath ?? Path.Combine(environment.ContentRootPath, "wwwroot"), "uploads", "products");
        Directory.CreateDirectory(uploadsPath);

        var filePath = Path.Combine(uploadsPath, fileName);
        await using var stream = File.Create(filePath);
        await file.CopyToAsync(stream, cancellationToken);

        return (fileName, $"/uploads/products/{fileName}");
    }
}
