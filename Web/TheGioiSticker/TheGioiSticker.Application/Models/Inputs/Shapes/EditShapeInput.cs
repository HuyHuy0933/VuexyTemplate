using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using TheGioiSticker.Data.Models.Enums;

namespace TheGioiSticker.Application.Models.Inputs.Shapes
{
	public class EditShapeInput
	{
        [Required]
        public string Name { get; set; }
        [Required]
        public ShapeStatus Status { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }
    }
}
