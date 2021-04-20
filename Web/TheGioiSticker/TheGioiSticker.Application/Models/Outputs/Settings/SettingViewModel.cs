using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Models.Outputs.Settings
{
	public class SettingViewModel
	{
        public int Id { get; set; }
        public string Name { get; set; }
        public string SettingValue { get; set; }

        public static Expression<Func<Setting, SettingViewModel>> GetFromSetting =
            (Setting s) => new SettingViewModel
            {
                Id = s.Id,
                Name = s.Name,
                SettingValue = s.SettingValue
            };
    }
}
