using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TheGioiSticker.Data.Models.Commons;
using TheGioiSticker.Data.Models.Enums;

namespace TheGioiSticker.Data.Models
{
    public class CategoryEntityConfiguration : BaseEntityConfiguration<Category>
    {
        public override void Configure(EntityTypeBuilder<Category> builder)
        {
            base.Configure(builder);
        }
    }

    public class Category : BaseEntity
    {
        public const int NAME_MAX_LENGTH = 250;
        public const int URL_MAX_LENGTH = 250;
        public const int IMAGE_MAX_LENGTH = 250;
        public const int DESCRIPTION_MAX_LENGTH = 250;
        public const string IMAGE_PATH = "upload/category";
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(NAME_MAX_LENGTH)]
        public string Name { get; set; }

        [Required, Column(TypeName = "decimal(18, 2)")]
        public decimal PriceUnit { get; set; }

        [Required]
        public StatusEnum Status { get; set; }

        [Required, MaxLength(DESCRIPTION_MAX_LENGTH)]
        public string Description { get; set; }

        [Required, MaxLength(URL_MAX_LENGTH)]
        public string Url { get; set; }

        [Required, MaxLength(IMAGE_MAX_LENGTH)]
        public string Image { get; set; }

        public Category(string image, string name, decimal priceUnit, StatusEnum status, string description, string url)
        {
            Image = image;
            Name = name;
            PriceUnit = priceUnit;
            Status = status;
            Description = description;
            Url = url;
        }
    }
}
