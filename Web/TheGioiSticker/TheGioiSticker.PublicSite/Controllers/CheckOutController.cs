using Microsoft.AspNetCore.Mvc;

namespace TheGioiSticker.PublicSite.Controllers
{
    public class CheckoutController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
