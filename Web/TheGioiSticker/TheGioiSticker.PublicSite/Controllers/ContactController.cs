using Microsoft.AspNetCore.Mvc;

namespace TheGioiSticker.PublicSite.Controllers
{
    public class ContactController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
