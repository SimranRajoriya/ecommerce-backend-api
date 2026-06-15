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
public class ProductsController(AppDbContext db, IFileStorageService fileStorageService) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<PagedResult<ProductResponse>>>> Get([FromQuery] ProductQuery query)
    {
        var pageNumber = Math.Max(query.PageNumber, 1);
        var pageSize = Math.Clamp(query.PageSize, 1, 50);

        var products = db.Products.Include(x => x.Category).Include(x => x.Images).AsQueryable();

        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            products = products.Where(x => x.Name.Contains(query.Search) || (x.Description != null && x.Description.Contains(query.Search)));
        }

        if (query.CategoryId.HasValue)
        {
            products = products.Where(x => x.CategoryId == query.CategoryId.Value);
        }

        if (query.MinPrice.HasValue)
        {
            products = products.Where(x => x.Price >= query.MinPrice.Value);
        }

        if (query.MaxPrice.HasValue)
        {
            products = products.Where(x => x.Price <= query.MaxPrice.Value);
        }

        if (query.IsActive.HasValue)
        {
            products = products.Where(x => x.IsActive == query.IsActive.Value);
        }

        var totalCount = await products.CountAsync();
        var items = await products
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new ProductResponse(
                x.Id,
                x.Name,
                x.Description,
                x.Price,
                x.StockQuantity,
                x.IsActive,
                x.CategoryId,
                x.Category != null ? x.Category.Name : null,
                x.Images.Select(image => image.Url).ToList()))
            .ToListAsync();

        return Ok(new ApiResponse<PagedResult<ProductResponse>>(true, "Products loaded.", new PagedResult<ProductResponse>(items, pageNumber, pageSize, totalCount)));
    }

    [HttpGet("{id:int}")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<ProductResponse>>> GetById(int id)
    {
        var product = await db.Products.Include(x => x.Category).Include(x => x.Images).FirstOrDefaultAsync(x => x.Id == id);
        if (product is null)
        {
            return NotFound(new ApiResponse<object>(false, "Product not found.", null));
        }

        return Ok(new ApiResponse<ProductResponse>(true, "Product loaded.", ToResponse(product)));
    }

    [HttpPost]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<ApiResponse<ProductResponse>>> Create(ProductRequest request)
    {
        if (!await db.Categories.AnyAsync(x => x.Id == request.CategoryId))
        {
            return BadRequest(new ApiResponse<object>(false, "Category does not exist.", null));
        }

        var product = new Product
        {
            Name = request.Name.Trim(),
            Description = request.Description,
            Price = request.Price,
            StockQuantity = request.StockQuantity,
            CategoryId = request.CategoryId,
            IsActive = request.IsActive
        };

        db.Products.Add(product);
        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = product.Id }, new ApiResponse<ProductResponse>(true, "Product created.", ToResponse(product)));
    }

    [HttpPut("{id:int}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<ApiResponse<ProductResponse>>> Update(int id, ProductRequest request)
    {
        var product = await db.Products.Include(x => x.Images).FirstOrDefaultAsync(x => x.Id == id);
        if (product is null)
        {
            return NotFound(new ApiResponse<object>(false, "Product not found.", null));
        }

        product.Name = request.Name.Trim();
        product.Description = request.Description;
        product.Price = request.Price;
        product.StockQuantity = request.StockQuantity;
        product.CategoryId = request.CategoryId;
        product.IsActive = request.IsActive;
        await db.SaveChangesAsync();

        return Ok(new ApiResponse<ProductResponse>(true, "Product updated.", ToResponse(product)));
    }

    [HttpDelete("{id:int}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<ApiResponse<object>>> Delete(int id)
    {
        var product = await db.Products.FindAsync(id);
        if (product is null)
        {
            return NotFound(new ApiResponse<object>(false, "Product not found.", null));
        }

        db.Products.Remove(product);
        await db.SaveChangesAsync();
        return Ok(new ApiResponse<object>(true, "Product deleted.", null));
    }

    [HttpPost("{id:int}/images")]
    [Authorize(Policy = "AdminOnly")]
    [RequestSizeLimit(5_000_000)]
    public async Task<ActionResult<ApiResponse<ProductImage>>> UploadImage(int id, IFormFile file)
    {
        var product = await db.Products.FindAsync(id);
        if (product is null)
        {
            return NotFound(new ApiResponse<object>(false, "Product not found.", null));
        }

        var savedFile = await fileStorageService.SaveProductImageAsync(file);
        var image = new ProductImage { ProductId = id, FileName = savedFile.FileName, Url = savedFile.Url };
        db.ProductImages.Add(image);
        await db.SaveChangesAsync();

        return Ok(new ApiResponse<ProductImage>(true, "Product image uploaded.", image));
    }

    private static ProductResponse ToResponse(Product product) =>
        new(product.Id, product.Name, product.Description, product.Price, product.StockQuantity, product.IsActive, product.CategoryId, product.Category?.Name, product.Images.Select(x => x.Url).ToList());
}
