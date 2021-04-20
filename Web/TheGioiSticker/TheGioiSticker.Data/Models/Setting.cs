using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;
using TheGioiSticker.Data.Models.Commons;

namespace TheGioiSticker.Data.Models
{
    public class SettingEntityConfiguration : BaseEntityConfiguration<Setting>
    {
        public override void Configure(EntityTypeBuilder<Setting> builder)
        {
            base.Configure(builder);
        }
    }

    public class Setting : BaseEntity
    {
        public const int NAME_MAX_LENGTH = 250;

        [Key]
        public int Id { get; set; }

        [Required, MaxLength(NAME_MAX_LENGTH)]
        public string Name { get; set; }

        public string SettingValue { get; set; }

        [Required, MaxLength(NAME_MAX_LENGTH)]
        public string Code { get; set; }

        public Setting(string name, string settingValue, string code)
        {
            Name = name;
            SettingValue = settingValue;
            Code = code;
        }
    }
}
