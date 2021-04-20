using Infrastructure.ListUtil.Extensions.IQueryable;
using LinqKit;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TheGioiSticker.Application.Models.Inputs.ContentPages;
using TheGioiSticker.Application.Models.Outputs.ContentPages;
using TheGioiSticker.Application.Services.ContentPages;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContentPageController : ControllerBase
    {
        private readonly ContentPageService _contentPageService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ContentPageController(ContentPageService contentPageService, IWebHostEnvironment webHostEnvironment)
        {
            _contentPageService = contentPageService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("list")]
        [ProducesResponseType(200, Type = typeof(PagedResults<ContentPageListViewModel>))]
        public IActionResult GetList([FromQuery] ContentPageListInput input)
        {
            return Ok(_contentPageService
                .GetSortedFilteredList(input, out var itemCount)
                .Select(ContentPageListViewModel.GetFromContentPage)
                .ToPagedResults(resultCount: itemCount));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateContentPageInput input)
        {
            var absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, ContentPage.IMAGE_PATH);

            await _contentPageService.Create(input, absolutePath);

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] EditContentPageInput input)
        {
            var absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, ContentPage.IMAGE_PATH);

            await _contentPageService.Edit(id, input, absolutePath);

            return Ok();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(ContentPageViewModel))]
        public async Task<IActionResult> Get(int id)
        {
            var contentPage = await _contentPageService.Get(id);
            return Ok(ContentPageViewModel.GetFromContentPage.Invoke(contentPage));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _contentPageService.Delete(id);

            return Ok();
        }

    }
}
