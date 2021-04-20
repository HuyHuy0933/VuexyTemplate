using Infrastructure.ListUtil.Extensions.IQueryable;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheGioiSticker.Application.Models.Inputs.DecalPrices;
using TheGioiSticker.Application.Repositories;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Services.DecalPrices
{
	public class DecalPriceService
	{
		private readonly IGenericRepository<DecalPrice> _decalPriceService;
		public DecalPriceService(IGenericRepository<DecalPrice> decalPriceService)
		{
			_decalPriceService = decalPriceService;
		}

		public IQueryable<DecalPrice> GetSortedFilteredList(DecalPriceListInput input, out int itemCount)
		{
			return _decalPriceService.GetAll().AsNoTracking().FilterSortAndGetPage(
				config: input.AsFilterSortPageConfig(),
				args: input,
				itemCount: out itemCount);
		}

		public async Task<DecalPrice> Get(int id)
		{
			return await _decalPriceService.GetById(id);
		}

		public async Task Edit(int id, EditDecalPriceInput input)
		{
			var decalPrice = await Get(id);
			decalPrice.Description = input.Description;
			decalPrice.Quantity = input.Quantity;
			decalPrice.PrintPrice = input.PrintPrice;
			decalPrice.MachiningPrice = input.MachiningPrice;
			decalPrice.CutPrint = input.CutPrint;
			await _decalPriceService.SaveChangesAsync();
		}

		public async Task Delete(int id)
		{
			await _decalPriceService.Delete(id, true);

			await _decalPriceService.SaveChangesAsync();
		}
	}
}
