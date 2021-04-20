using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.ListUtil.Extensions.IQueryable;
using LinqKit;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheGioiSticker.Application.Models.Inputs.Shapes;
using TheGioiSticker.Application.Models.Outputs.Shapes;
using TheGioiSticker.Application.Services.Shapes;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ShapeController : ControllerBase
	{
        private readonly ShapeService _shapeService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ShapeController(ShapeService shapeService, DbContext dbContext, IWebHostEnvironment webHostEnvironment)
        {
            _shapeService = shapeService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateShapeInput input)
        {
            var absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, Shape.IMAGE_PATH);

            await _shapeService.Create(input, absolutePath);

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromForm] EditShapeInput input)
        {
            var absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, Shape.IMAGE_PATH);
            await _shapeService.Edit(id, input, absolutePath);
            return Ok();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(ShapeViewModel))]
        public async Task<IActionResult> Get(int id)
        {
            var shape = await _shapeService.Get(id);
            return Ok(ShapeViewModel.GetFromShape.Invoke(shape));
        }

        [HttpGet("list")]
        [ProducesResponseType(200, Type = typeof(PagedResults<ShapeListViewModel>))]
        public IActionResult GetList([FromQuery] ShapeListInput input)
        {
            return Ok(_shapeService
                .GetSortedFilteredList(input, out var itemCount)
                .Select(ShapeListViewModel.GetFromShape)
                .ToPagedResults(resultCount: itemCount));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _shapeService.Delete(id);

            return Ok();
        }
    }
}
