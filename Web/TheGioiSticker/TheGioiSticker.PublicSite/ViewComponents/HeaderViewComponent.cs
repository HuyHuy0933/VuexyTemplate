using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace TheGioiSticker.PublicSite.ViewComponents
{
    public class HeaderViewComponent : ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync()
        {
            return await Task.FromResult(View());
        }
    }
}
