using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;
using TheGioiSticker.Data.Models.Commons;

namespace TheGioiSticker.Data.Models
{
    public class BlogEntityConfiguration : BaseEntityConfiguration<Blog>
    {
        public override void Configure(EntityTypeBuilder<Blog> builder)
        {
            base.Configure(builder);
        }
    }

    public class Blog : BaseEntity
    {
        public const int TITLE_MAX_LENGTH = 250;
        public const string IMAGE_PATH = "upload/blog";

        [Key]
        public int Id { get; set; }
        [Required, MaxLength(TITLE_MAX_LENGTH)]
        public string Title { get; set; }
        public string Description { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public string Content { get; set; }
        public string SeoUrl { get; set; }
        public string MetaDescription { get; set; }
        public string MetaTitle { get; set; }

        public Blog(string title, string image, string description, string content, string seoUrl, string metaDescription, string metaTitle)
        {
            Title = title;
            Image = image;
            Description = description;
            Content = content;
            SeoUrl = seoUrl;
            MetaDescription = metaDescription;
            MetaTitle = metaTitle;
        }
    }
}
