using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Text.Json;
using TheGioiSticker.Data.Models;
using TheGioiSticker.Data.Models.Enums;

namespace TheGioiSticker.Application.Models.Outputs.Products
{
	public class ProductListViewModel
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public int ProductCategoryId { get; set; }

		public string Code { get; set; }

		public string Description { get; set; }

		public decimal Price { get; set; }

		private string _jsonImages;
		public string Images
		{
			get
			{
				return !string.IsNullOrWhiteSpace(_jsonImages) ? _jsonImages.Split(";").Select(x => $"{Product.IMAGE_PATH}/{x}").FirstOrDefault() : string.Empty;
			}
		}

		public ProductStatus Status { get; set; }

		public string SeoUrl { get; set; }

		public string MetaDescription { get; set; }

		public string MetaTitle { get; set; }

		public static Expression<Func<Product, ProductListViewModel>> GetFromProduct =
			(Product p) => new ProductListViewModel
			{
				Id = p.Id,
				Name = p.Name,
				Description = p.Description,
				Code = p.Code,
				MetaDescription = p.MetaDescription,
				Price = p.Price,
				_jsonImages = p.Images,
				Status = p.Status,
				SeoUrl = p.SeoUrl,
				MetaTitle = p.MetaTitle,
				ProductCategoryId = p.ProductCategoryId
			};
	}
}
