using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Models.Outputs.Settings
{
	public class SettingListViewModel
	{
        public int Id { get; set; }
        public string Name { get; set; }
        public string SettingValue { get; set; }

        public static Expression<Func<Setting, SettingListViewModel>> GetFromProduct =
            (Setting c) => new SettingListViewModel
            {
                Id = c.Id,
                Name = c.Name,
                SettingValue = c.SettingValue
            };
    }
}
