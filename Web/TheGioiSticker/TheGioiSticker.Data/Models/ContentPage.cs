using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;
using TheGioiSticker.Data.Models.Commons;

namespace TheGioiSticker.Data.Models
{
    public class ContentPageEntityConfiguration : BaseEntityConfiguration<ContentPage>
    {
        public override void Configure(EntityTypeBuilder<ContentPage> builder)
        {
            base.Configure(builder);
        }
    }

    public class ContentPage : BaseEntity
    {
        public const int TITLE_MAX_LENGTH = 250;
        public const string IMAGE_PATH = "upload/content-page";

        [Key]
        public int Id { get; set; }

        [Required, MaxLength(TITLE_MAX_LENGTH)]
        public string Title { get; set; }

        public string Content { get; set; }
        public string SeoUrl { get; set; }
        public string MetaDescription { get; set; }
        public string MetaTitle { get; set; }
    }
}
