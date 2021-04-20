using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using TheGioiSticker.Data.Models.Enums;

namespace TheGioiSticker.Application.Models.Inputs.Products
{
	public class CreateProductInput
	{
		[Required]
		public string Name { get; set; }
		public string Description { get; set; }
		[Required]
		public decimal Price { get; set; }
		[Required]
		public List<IFormFile> ImageFiles { get; set; }
		[Required]
		public ProductStatus Status { get; set; }
		[Required]
		public string SeoUrl { get; set; }
		public string MetaDescription { get; set; }
		[Required]
		public string MetaTitle { get; set; }
	}
}
