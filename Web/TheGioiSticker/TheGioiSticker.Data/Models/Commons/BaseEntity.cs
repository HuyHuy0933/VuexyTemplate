using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.ComponentModel.DataAnnotations;

namespace TheGioiSticker.Data.Models.Commons
{
    public class BaseEntityConfiguration<T> : IEntityTypeConfiguration<T> where T : BaseEntity
    {
        public virtual void Configure(EntityTypeBuilder<T> builder)
        {
            builder.Property(n => n.DateCreated).HasDefaultValueSql("GETUTCDATE()").ValueGeneratedOnAdd();
            builder.Property(n => n.isDeleted).HasDefaultValue(false).ValueGeneratedOnAdd();
        }
    }

    public class BaseEntity
    {
        [Required]
        public DateTimeOffset DateCreated { get; set; }
        [Required]
        public bool isDeleted { get; set; }
        public DateTimeOffset? DateDeleted { get; set; }
        public DateTimeOffset? DateUpdated { get; set; }
    }
}
