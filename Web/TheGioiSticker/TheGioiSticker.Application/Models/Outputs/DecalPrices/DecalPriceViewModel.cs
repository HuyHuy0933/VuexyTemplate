using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Models.Outputs.DecalPrices
{
	public class DecalPriceViewModel
	{
		public int Id { get; set; }
		public string Description { get; set; }
		public int Quantity { get; set; }
		public decimal PrintPrice { get; set; }
		public decimal CutPrice { get; set; }
		public decimal MachiningPrice { get; set; }

		public static Expression<Func<DecalPrice, DecalPriceListViewModel>> GetFromDecalPrice =
			(DecalPrice p) => new DecalPriceListViewModel
			{
				Id = p.Id,
				Description = p.Description,
				CutPrice = p.CutPrint,
				MachiningPrice = p.MachiningPrice,
				PrintPrice = p.PrintPrice,
				Quantity = p.Quantity
			};
	}
}
