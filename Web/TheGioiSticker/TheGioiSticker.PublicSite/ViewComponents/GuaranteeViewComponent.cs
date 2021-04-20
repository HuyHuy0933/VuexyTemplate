using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace TheGioiSticker.PublicSite.ViewComponents
{
    public class GuaranteeViewComponent : ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync()
        {
            return await Task.FromResult(View());
        }
    }
}
