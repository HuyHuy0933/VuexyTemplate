using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.ListUtil.Extensions.IQueryable;
using LinqKit;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheGioiSticker.Application.Models.Inputs.ProductCategories;
using TheGioiSticker.Application.Models.Outputs.ProductCategories;
using TheGioiSticker.Application.Services.ProductCategories;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductCategoryController : ControllerBase
	{
        private readonly ProductCategoryService _productCateService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductCategoryController(ProductCategoryService productCateService, IWebHostEnvironment webHostEnvironment)
        {
            _productCateService = productCateService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateProductCategoryInput input)
        {
            var absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, ProductCategory.IMAGE_PATH);

            await _productCateService.Create(input, absolutePath);

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromForm] EditProductCategoryInput input)
        {
            var absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, ProductCategory.IMAGE_PATH);
            await _productCateService.Edit(id, input, absolutePath);

            return Ok();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(ProductCategoryViewModel))]
        public async Task<IActionResult> Get(int id)
        {
            var procate = await _productCateService.Get(id);
            return Ok(ProductCategoryViewModel.GetFromShape.Invoke(procate));
        }

        [HttpGet("list")]
        [ProducesResponseType(200, Type = typeof(PagedResults<ProductCategoryListViewModel>))]
        public IActionResult GetList([FromQuery] ProductCategoryListInput input)
        {
            return Ok(_productCateService
                .GetSortedFilteredList(input, out var itemCount)
                .Select(ProductCategoryListViewModel.GetFromProductCategory)
                .ToPagedResults(resultCount: itemCount));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _productCateService.Delete(id);

            return Ok();
        }
    }
}
