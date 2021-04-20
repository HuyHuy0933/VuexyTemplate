using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using TheGioiSticker.Data.Models.Enums;

namespace TheGioiSticker.Application.Models.Inputs.Products
{
	public class EditProductInput
	{
		[Required]
		public string Name { get; set; }
		public string Description { get; set; }
		[Required]
		public decimal Price { get; set; }
		public List<IFormFile> ImageFiles { get; set; }
		public List<string> ImageLinks { get; set; }
		[Required]
		public ProductStatus Status { get; set; }
		[Required]
		public string SeoUrl { get; set; }

		public string MetaDescription { get; set; }
		[Required]
		public string MetaTitle { get; set; }
	}
}
