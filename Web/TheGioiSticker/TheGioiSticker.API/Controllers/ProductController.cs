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
using Microsoft.EntityFrameworkCore;
using TheGioiSticker.Application.Models.Inputs.Products;
using TheGioiSticker.Application.Models.Outputs.Products;
using TheGioiSticker.Application.Services.Products;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductController : ControllerBase
	{
		private readonly ProductService _productService;
		private readonly DbContext _dbContext;
		private readonly IWebHostEnvironment _webHostEnvironment;
		public ProductController(ProductService productService, DbContext dbContext, IWebHostEnvironment webHostEnvironment)
		{
			_productService = productService;
			_dbContext = dbContext;
			_webHostEnvironment = webHostEnvironment;
		}

		[HttpGet("list")]
		[ProducesResponseType(200, Type = typeof(PagedResults<ProductListViewModel>))]
		public IActionResult GetList([FromQuery] ProductListInput input)
		{
			return Ok(_productService
				.GetSortedFilteredList(input, out var itemCount)
				.Select(ProductListViewModel.GetFromProduct)
				.ToPagedResults(resultCount: itemCount));
		}

		[HttpPost]
		public async Task<IActionResult> Create([FromForm] CreateProductInput input)
		{
			var absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, Product.IMAGE_PATH);
			await _productService.Create(input, absolutePath);

			await _dbContext.SaveChangesAsync();

			return Ok();
		}
		 
		[HttpPut("{id}")]
		public async Task<IActionResult> Edit(int id, [FromForm] EditProductInput input)
		{
			var absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, Product.IMAGE_PATH);
			await _productService.Edit(id, input, absolutePath);

			await _dbContext.SaveChangesAsync();

			return Ok();
		}

		[HttpGet("{id}")]
		[ProducesResponseType(200, Type = typeof(ProductViewModel))]
		public async Task<IActionResult> Get(int id)
		{
			var product = await _productService.Get(id);
			return Ok(ProductViewModel.GetFromProduct.Invoke(product));
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			await _productService.Delete(id);

			await _dbContext.SaveChangesAsync();

			return Ok();
		}
	}
}
