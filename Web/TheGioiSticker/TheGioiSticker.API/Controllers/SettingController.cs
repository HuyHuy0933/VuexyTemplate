using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.ListUtil.Extensions.IQueryable;
using LinqKit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheGioiSticker.Application.Models.Inputs.Settings;
using TheGioiSticker.Application.Models.Outputs.Settings;
using TheGioiSticker.Application.Services.Settings;

namespace TheGioiSticker.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SettingController : ControllerBase
	{
		private readonly SettingService _settingService;
		private readonly DbContext _dbContext;
		public SettingController(SettingService settingService, DbContext dbContext)
		{
			_settingService = settingService;
			_dbContext = dbContext;
		}

		[HttpGet("list")]
		[ProducesResponseType(200, Type = typeof(PagedResults<SettingListViewModel>))]
		public IActionResult GetList([FromQuery] SettingListInput input)
		{
			return Ok(_settingService
				.GetSortedFilteredList(input, out var itemCount)
				.Select(SettingListViewModel.GetFromProduct)
				.ToPagedResults(resultCount: itemCount));
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> Edit(int id, [FromBody] EditSettingInput input)
		{
			await _settingService.Edit(id, input);

			await _dbContext.SaveChangesAsync();

			return Ok();
		}

		[HttpGet("{id}")]
		[ProducesResponseType(200, Type = typeof(SettingViewModel))]
		public async Task<IActionResult> Get(int id)
		{
			var setting = await _settingService.Get(id);
			return Ok(SettingViewModel.GetFromSetting.Invoke(setting));
		}
	}
}
