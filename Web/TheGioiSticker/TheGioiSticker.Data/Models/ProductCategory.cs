using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;
using TheGioiSticker.Data.Models.Commons;
using TheGioiSticker.Data.Models.Enums;

namespace TheGioiSticker.Data.Models
{
    public class ProductCategoryEntityConfiguration : BaseEntityConfiguration<ProductCategory>
    {
        public override void Configure(EntityTypeBuilder<ProductCategory> builder)
        {
            base.Configure(builder);
        }
    }

    public class ProductCategory : BaseEntity
    {
        public const int NAME_MAX_LENGTH = 250;
        public const int IMAGE_MAX_LENGTH = 250;
        public const int URL_MAX_LENGTH = 250;
        public const string IMAGE_PATH = "upload/productCategory";

        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(NAME_MAX_LENGTH)]
        public string Name { get; set; }
        [Required]
        public ProductCategoryStatus Status { get; set; }
        [Required]
        [MaxLength(IMAGE_MAX_LENGTH)]
        public string Image { get; set; }
        [Required]
        [MaxLength(URL_MAX_LENGTH)]
        public string Url { get; set; }

        public ProductCategory(string name, ProductCategoryStatus status, string image, string url)
        {
            Name = name;
            Status = status;
            Image = image;
            Url = url;
        }
    }
}
