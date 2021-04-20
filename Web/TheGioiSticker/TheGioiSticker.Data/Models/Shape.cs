using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;
using TheGioiSticker.Data.Models.Commons;
using TheGioiSticker.Data.Models.Enums;

namespace TheGioiSticker.Data.Models
{
    public class ShapeEntityConfiguration : BaseEntityConfiguration<Shape>
    {
        public override void Configure(EntityTypeBuilder<Shape> builder)
        {
            base.Configure(builder);
        }
    }

    public class Shape : BaseEntity
    {
        public const int NAME_MAX_LENGTH = 250;
        public const int IMAGE_MAX_LENGTH = 250;
        public const int DESCRIPTION_MAX_LENGTH = 250;
        public const string IMAGE_PATH = "upload/shape";
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(NAME_MAX_LENGTH)]
        public string Name { get; set; }
        [Required]
        [MaxLength(IMAGE_MAX_LENGTH)]
        public string Image { get; set; }
        [Required]
        public ShapeStatus Status { get; set; }

        [MaxLength(DESCRIPTION_MAX_LENGTH)]
        public string Description { get; set; }
        public Shape(string name, string image, ShapeStatus status, string description)
        {
            Name = name;
            Image = image;
            Status = status;
            Description = description;
        }
    }
}
