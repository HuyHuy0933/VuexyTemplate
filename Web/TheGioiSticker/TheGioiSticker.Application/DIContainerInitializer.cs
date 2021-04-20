using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TheGioiSticker.Application.Repositories;
using TheGioiSticker.Application.Services.Blogs;
using TheGioiSticker.Application.Services.Categories;
using TheGioiSticker.Application.Services.ContentPages;
using TheGioiSticker.Application.Services.DecalPrices;
using TheGioiSticker.Application.Services.ProductCategories;
using TheGioiSticker.Application.Services.Products;
using TheGioiSticker.Application.Services.Settings;
using TheGioiSticker.Application.Services.Shapes;
using TheGioiSticker.Data;

namespace TheGioiSticker.Application
{
    public static class DIContainerInitializer
    {
        public static void Init(IServiceCollection serviceProvider)
        {
            // services
            serviceProvider.AddTransient<CategoryService>();
            serviceProvider.AddTransient<ProductService>();
            serviceProvider.AddTransient<SettingService>();
            serviceProvider.AddTransient<ShapeService>();
            serviceProvider.AddTransient<ProductCategoryService>();
            serviceProvider.AddTransient<ContentPageService>();
            serviceProvider.AddTransient<DecalPriceService>();
            serviceProvider.AddTransient<BlogService>();

            // repositories
            serviceProvider.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        }

        public static void InitDB(IServiceCollection serviceProvider, IConfiguration configuration)
        {
            serviceProvider.AddDbContext<StickerWorldDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("Database")));
            serviceProvider.AddScoped<DbContext, StickerWorldDbContext>();
        }
    }
}
