using Microsoft.AspNetCore.Mvc;

namespace TheGioiSticker.PublicSite.Controllers
{
    public class OnlineLibraryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
