using ECommerceBackend.Data;
using ECommerceBackend.DTOs;
using ECommerceBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<List<CategoryResponse>>>> GetAll()
    {
        var categories = await db.Categories
            .OrderBy(x => x.Name)
            .Select(x => new CategoryResponse(x.Id, x.Name, x.Description, x.IsActive))
            .ToListAsync();

        return Ok(new ApiResponse<List<CategoryResponse>>(true, "Categories loaded.", categories));
    }

    [HttpPost]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<ApiResponse<CategoryResponse>>> Create(CategoryRequest request)
    {
        var category = new Category { Name = request.Name.Trim(), Description = request.Description, IsActive = request.IsActive };
        db.Categories.Add(category);
        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAll), new ApiResponse<CategoryResponse>(true, "Category created.", new CategoryResponse(category.Id, category.Name, category.Description, category.IsActive)));
    }

    [HttpPut("{id:int}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<ApiResponse<CategoryResponse>>> Update(int id, CategoryRequest request)
    {
        var category = await db.Categories.FindAsync(id);
        if (category is null)
        {
            return NotFound(new ApiResponse<object>(false, "Category not found.", null));
        }

        category.Name = request.Name.Trim();
        category.Description = request.Description;
        category.IsActive = request.IsActive;
        await db.SaveChangesAsync();

        return Ok(new ApiResponse<CategoryResponse>(true, "Category updated.", new CategoryResponse(category.Id, category.Name, category.Description, category.IsActive)));
    }

    [HttpDelete("{id:int}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<ApiResponse<object>>> Delete(int id)
    {
        var category = await db.Categories.FindAsync(id);
        if (category is null)
        {
            return NotFound(new ApiResponse<object>(false, "Category not found.", null));
        }

        db.Categories.Remove(category);
        await db.SaveChangesAsync();
        return Ok(new ApiResponse<object>(true, "Category deleted.", null));
    }
}
