using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using TheGioiSticker.Data.Models;
using TheGioiSticker.Data.Models.Enums;

namespace TheGioiSticker.Application.Models.Outputs.ProductCategories
{
	public class ProductCategoryListViewModel
	{
        public int Id { get; set; }
        public string Name { get; set; }
        public ProductCategoryStatus Status { get; set; }
        public string Image { get; set; }
        public string Url { get; set; }

        public static Expression<Func<ProductCategory, ProductCategoryListViewModel>> GetFromProductCategory =
            (ProductCategory p) => new ProductCategoryListViewModel
            {
                Id = p.Id,
                Name = p.Name,
                Image = $"{ProductCategory.IMAGE_PATH}/{p.Image}",
                Status = p.Status,
                Url = p.Url
            };
    }
}
