using Microsoft.AspNetCore.Mvc;

namespace TheGioiSticker.PublicSite.Controllers
{
	public class ProductsController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
