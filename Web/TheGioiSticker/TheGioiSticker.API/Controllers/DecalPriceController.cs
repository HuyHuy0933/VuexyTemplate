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
using TheGioiSticker.Application.Models.Inputs.DecalPrices;
using TheGioiSticker.Application.Models.Outputs.DecalPrices;
using TheGioiSticker.Application.Services.DecalPrices;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class DecalPriceController : ControllerBase
	{
		private readonly DecalPriceService _decalPriceService;
		private readonly IWebHostEnvironment _webHostEnvironment;

		public DecalPriceController(DecalPriceService shapeService, DbContext dbContext, IWebHostEnvironment webHostEnvironment)
		{
			_decalPriceService = shapeService;
			_webHostEnvironment = webHostEnvironment;
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> Edit(int id, [FromForm] EditDecalPriceInput input)
		{
			await _decalPriceService.Edit(id, input);
			return Ok();
		}

		[HttpGet("{id}")]
		[ProducesResponseType(200, Type = typeof(DecalPriceViewModel))]
		public async Task<IActionResult> Get(int id)
		{
			var decalPrice = await _decalPriceService.Get(id);
			return Ok(DecalPriceViewModel.GetFromDecalPrice.Invoke(decalPrice));
		}

		[HttpGet("list")]
		[ProducesResponseType(200, Type = typeof(PagedResults<DecalPriceListViewModel>))]
		public IActionResult GetList([FromQuery] DecalPriceListInput input)
		{
			return Ok(_decalPriceService
				.GetSortedFilteredList(input, out var itemCount)
				.Select(DecalPriceListViewModel.GetFromDecalPrice)
				.ToPagedResults(resultCount: itemCount));
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			await _decalPriceService.Delete(id);

			return Ok();
		}
	}
}
