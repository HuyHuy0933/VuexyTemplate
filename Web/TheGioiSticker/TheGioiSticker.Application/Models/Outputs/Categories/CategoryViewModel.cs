using System;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using TheGioiSticker.Data.Models;
using TheGioiSticker.Data.Models.Enums;

namespace TheGioiSticker.Application.Models.Outputs.Categories
{
    public class CategoryViewModel
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public decimal PriceUnit { get; set; }
        public StatusEnum Status { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }

        public static Expression<Func<Category, CategoryViewModel>> GetFromCategory =
            (Category c) => new CategoryViewModel
            {
                Id = c.Id,
                Image = $"{Category.IMAGE_PATH}/{c.Image}",
                Name = c.Name,
                PriceUnit = c.PriceUnit,
                Status = c.Status,
                Description = c.Description,
                Url = c.Url,
            };
    }
}
