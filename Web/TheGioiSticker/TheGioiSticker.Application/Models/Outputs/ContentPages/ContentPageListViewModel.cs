using System;
using System.Linq.Expressions;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Models.Outputs.ContentPages
{
    public class ContentPageListViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string SeoUrl { get; set; }


        public static Expression<Func<ContentPage, ContentPageListViewModel>> GetFromContentPage =
            (ContentPage n) => new ContentPageListViewModel
            {
                Id = n.Id,
                Title = n.Title,
                SeoUrl = n.SeoUrl
            };
    }
}
