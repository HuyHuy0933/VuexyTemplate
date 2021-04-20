using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using TheGioiSticker.Data.Models;
using TheGioiSticker.Data.Models.Enums;

namespace TheGioiSticker.Application.Models.Outputs.Shapes
{
	public class ShapeListViewModel
	{
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public ShapeStatus Status { get; set; }

        public static Expression<Func<Shape, ShapeListViewModel>> GetFromShape =
            (Shape s) => new ShapeListViewModel
            {
                Id = s.Id,
                Name = s.Name,
                Image = $"{Shape.IMAGE_PATH}/{s.Image}",
                Status = s.Status,
                Description = s.Description
            };
    }
}
