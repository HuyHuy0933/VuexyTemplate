using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using TheGioiSticker.Data.Models.Enums;

namespace TheGioiSticker.Application.Models.Inputs.Categories
{
    public class CreateCategoryInput
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal PriceUnit { get; set; }
        [Required]
        public StatusEnum Status { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Url { get; set; }
        [Required]
        public IFormFile Image { get; set; }
    }
}
