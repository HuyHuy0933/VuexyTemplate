using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;
using TheGioiSticker.Data.Models.Commons;

namespace TheGioiSticker.Data.Models
{
    public class StickerEntityConfiguration : BaseEntityConfiguration<Sticker>
    {
        public override void Configure(EntityTypeBuilder<Sticker> builder)
        {
            base.Configure(builder);
        }
    }

    public class Sticker : BaseEntity
    {
        public const int NAME_MAX_LENGTH = 250;

        [Key]
        public int Id { get; set; }
        [Required, MaxLength(NAME_MAX_LENGTH)]
        public string Name { get; set; }
    }
}
