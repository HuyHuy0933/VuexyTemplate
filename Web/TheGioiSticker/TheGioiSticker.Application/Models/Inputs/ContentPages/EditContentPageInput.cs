using System.ComponentModel.DataAnnotations;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Models.Inputs.ContentPages
{
    public class EditContentPageInput
    {
        [Required, MaxLength(ContentPage.TITLE_MAX_LENGTH)]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public string SeoUrl { get; set; }
        public string MetaDescription { get; set; }
        public string MetaTitle { get; set; }
    }
}
