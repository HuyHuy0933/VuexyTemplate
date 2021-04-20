using Infrastructure.ListUtil.Extensions.IQueryable;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheGioiSticker.Application.Models.Inputs.Settings;
using TheGioiSticker.Application.Repositories;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Services.Settings
{
	public class SettingService
	{
		private readonly IGenericRepository<Setting> _settingRepo;
		public SettingService(IGenericRepository<Setting> settingRepo)
		{
			_settingRepo = settingRepo;
		}

		public IQueryable<Setting> GetSortedFilteredList(SettingListInput input, out int itemCount)
		{
			return _settingRepo.GetAll().FilterSortAndGetPage(
				config: input.AsFilterSortPageConfig(),
				args: input,
				itemCount: out itemCount);
		}

		public async Task<Setting> Get(int id)
		{
			return await _settingRepo.GetById(id);
		}

		public async Task Edit(int id, EditSettingInput input)
		{
			var setting = await Get(id);
			setting.Name = input.Name;
			setting.SettingValue = input.SettingValue;
		}
	}
}
