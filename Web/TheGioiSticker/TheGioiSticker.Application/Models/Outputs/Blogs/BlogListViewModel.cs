using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Models.Outputs.Blogs
{
	public class BlogListViewModel
	{
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string Content { get; set; }
        public string SeoUrl { get; set; }
        public string MetaDescription { get; set; }
        public string MetaTitle { get; set; }

        public static Expression<Func<Blog, BlogViewModel>> GetFromBlog =
            (Blog b) => new BlogViewModel
            {
                Id = b.Id,
                Title = b.Title,
                Image = $"{Blog.IMAGE_PATH}/{b.Image}",
                Description = b.Description,
                Content = b.Content,
                SeoUrl = b.SeoUrl,
                MetaDescription = b.MetaDescription,
                MetaTitle = b.MetaTitle
            };
    }
}
