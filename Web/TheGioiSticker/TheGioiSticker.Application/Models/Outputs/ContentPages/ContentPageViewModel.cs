using System;
using System.Linq.Expressions;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Models.Outputs.ContentPages
{
    public class ContentPageViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string SeoUrl { get; set; }
        public string MetaDescription { get; set; }
        public string MetaTitle { get; set; }

        public static Expression<Func<ContentPage, ContentPageViewModel>> GetFromContentPage =
            (ContentPage n) => new ContentPageViewModel
            {
                Id = n.Id,
                Title = n.Title,
                Content = n.Content,
                SeoUrl = n.SeoUrl,
                MetaDescription = n.MetaDescription,
                MetaTitle = n.MetaTitle
            };
    }
}
