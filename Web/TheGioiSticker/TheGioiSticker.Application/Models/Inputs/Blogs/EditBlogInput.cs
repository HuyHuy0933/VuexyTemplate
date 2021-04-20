using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TheGioiSticker.Application.Models.Inputs.Blogs
{
	public class EditBlogInput
	{
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }
        [Required]
        public string Content { get; set; }
        public string SeoUrl { get; set; }
        public string MetaDescription { get; set; }
        public string MetaTitle { get; set; }
    }
}
