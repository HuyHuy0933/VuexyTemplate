using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;
using TheGioiSticker.Data.Models.Commons;

namespace TheGioiSticker.Data.Models
{
    public class DecalPriceEntityConfiguration : BaseEntityConfiguration<DecalPrice>
    {
        public override void Configure(EntityTypeBuilder<DecalPrice> builder)
        {
            base.Configure(builder);
        }
    }

    public class DecalPrice : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        public string Description { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public decimal PrintPrice { get; set; }

        [Required]
        public decimal CutPrint { get; set; }

        [Required]
        public decimal MachiningPrice { get; set; }
    }
}
