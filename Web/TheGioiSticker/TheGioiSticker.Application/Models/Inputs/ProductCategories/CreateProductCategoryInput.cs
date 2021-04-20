using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using TheGioiSticker.Data.Models.Enums;

namespace TheGioiSticker.Application.Models.Inputs.ProductCategories
{
	public class CreateProductCategoryInput
	{
        [Required]
        public string Name { get; set; }
        [Required]
        public ProductCategoryStatus Status { get; set; }
        [Required]
        public string Url { get; set; }
        [Required]
        public IFormFile Image { get; set; }
    }
}
