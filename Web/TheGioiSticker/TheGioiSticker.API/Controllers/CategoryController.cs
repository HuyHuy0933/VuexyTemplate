
using Infrastructure.ListUtil.Extensions.IQueryable;
using LinqKit;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TheGioiSticker.Application.Models.Inputs.Categories;
using TheGioiSticker.Application.Models.Outputs.Categories;
using TheGioiSticker.Application.Services.Categories;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryService _categoryService;
        private readonly DbContext _dbContext;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public CategoryController(CategoryService categoryService, DbContext dbContext, IWebHostEnvironment webHostEnvironment)
        {
            _categoryService = categoryService;
            _dbContext = dbContext;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateCategoryInput input)
        {
            var absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, Category.IMAGE_PATH);

            await _categoryService.Create(input, absolutePath);

            await _dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromForm] EditCategoryInput input)
        {
            var absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, Category.IMAGE_PATH);
            await _categoryService.Edit(id, input, absolutePath);

            await _dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(CategoryViewModel))]
        public async Task<IActionResult> Get(int id)
        {
            var category = await _categoryService.Get(id);
            return Ok(CategoryViewModel.GetFromCategory.Invoke(category));
        }

        [HttpGet("list")]
        [ProducesResponseType(200, Type = typeof(PagedResults<CategoryListViewModel>))]
        public IActionResult GetList([FromQuery] CategoryListInput input)
        {
            return Ok(_categoryService
                .GetSortedFilteredList(input, out var itemCount)
                .Select(CategoryListViewModel.GetFromCategory)
                .ToPagedResults(resultCount: itemCount)); 
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _categoryService.Delete(id);

            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
