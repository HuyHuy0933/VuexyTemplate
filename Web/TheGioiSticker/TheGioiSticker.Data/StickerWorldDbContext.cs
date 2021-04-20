using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TheGioiSticker.Data.Models;
using TheGioiSticker.Data.Models.Commons;

namespace TheGioiSticker.Data
{
    public class StickerWorldDbContext : DbContext
    {
        public StickerWorldDbContext(DbContextOptions<StickerWorldDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Auto apply configuration by convention.
            builder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);

            base.OnModelCreating(builder);
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            OnChanges();

            return await base.SaveChangesAsync(cancellationToken);
        }

        public override int SaveChanges()
        {
            OnChanges();

            return base.SaveChanges();
        }

        public void OnChanges()
        {
            var entries = ChangeTracker
                .Entries()
                .Where(e => e.Entity is BaseEntity && e.State == EntityState.Modified);

            foreach (var entityEntry in entries)
            {
                ((BaseEntity)entityEntry.Entity).DateUpdated = DateTimeOffset.UtcNow;
            }
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Setting> Settings { get; set; }
        public DbSet<Sticker> Stickers { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Shape> Shapes { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<ContentPage> ContentPages { get; set; }
        public DbSet<DecalPrice> DecalPrices { get; set; }
        
    }
}
