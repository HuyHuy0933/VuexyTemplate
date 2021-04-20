using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheGioiSticker.PublicSite.Controllers
{
    public class AssistController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
