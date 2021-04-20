using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TheGioiSticker.Data.Models.Commons;
using TheGioiSticker.Data.Models.Enums;

namespace TheGioiSticker.Data.Models
{
	public class ProductEntityConfiguration : BaseEntityConfiguration<Product>
	{
		public override void Configure(EntityTypeBuilder<Product> builder)
		{
			base.Configure(builder);
		}
	}

	public class Product : BaseEntity
	{
		public const int NAME_MAX_LENGTH = 250;
		public const int CODE_MAX_LENGTH = 250;
		public const int DESCRIPTION_MAX_LENGTH = 250;
		public const int IMAGES_MAX_LENGTH = 250;
		public const int SEO_URL_MAX_LENGTH = 250;
		public const int META_DES_MAX_LENGTH = 250;
		public const int META_TITLE_MAX_LENGTH = 250;
		public const string IMAGE_PATH = "upload/product";

		[Key]
		public int Id { get; set; }

		[Required, MaxLength(NAME_MAX_LENGTH)]
		public string Name { get; set; }

		[Required]
		public int ProductCategoryId { get; set; }

		[Required, MaxLength(CODE_MAX_LENGTH)]
		public string Code { get; set; }

		[MaxLength(DESCRIPTION_MAX_LENGTH)]
		public string Description { get; set; }

		[Required]
		public decimal Price { get; set; }

		[Required, MaxLength(IMAGES_MAX_LENGTH)]
        public string Images { get; set; }

		[Required]
		public ProductStatus Status { get; set; }

		[Required, MaxLength(SEO_URL_MAX_LENGTH)]
        public string SeoUrl { get; set; }

		[MaxLength(META_DES_MAX_LENGTH)]
		public string MetaDescription { get; set; }

		[MaxLength(META_TITLE_MAX_LENGTH)]
		public string MetaTitle { get; set; }

		[ForeignKey("ProductCategoryId")]
		public virtual ProductCategory ProductCategory { get; set; }
		public Product(string name,
			int productCategoryId,
			string code,
			string description,
			decimal price,
			string images,
			ProductStatus status,
			string seoUrl,
			string metaDescription,
			string metaTitle)
		{
			Name = name;
			ProductCategoryId = productCategoryId;
			Code = code;
			Description = description;
			Price = price;
			Images = images;
			Status = status;
			SeoUrl = seoUrl;
			MetaDescription = metaDescription;
			MetaTitle = metaTitle;
		}
	}
}
