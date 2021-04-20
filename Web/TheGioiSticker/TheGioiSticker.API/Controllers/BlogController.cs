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
using TheGioiSticker.Application.Models.Inputs.Blogs;
using TheGioiSticker.Application.Models.Outputs.Blogs;
using TheGioiSticker.Application.Services.Blogs;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BlogController : ControllerBase
	{
        private readonly BlogService _blogService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public BlogController(BlogService contentPageService, IWebHostEnvironment webHostEnvironment)
        {
            _blogService = contentPageService;
            _webHostEnvironment = webHostEnvironment;
        }

        [ProducesResponseType(200, Type = typeof(PagedResults<BlogListViewModel>))]
        [HttpGet("list")]
        public IActionResult GetList([FromQuery] BlogListInput input)
        {
            return Ok(_blogService
                .GetSortedFilteredList(input, out var itemCount)
                .Select(BlogListViewModel.GetFromBlog)
                .ToPagedResults(resultCount: itemCount));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateBlogInput input)
        {
            var absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, Blog.IMAGE_PATH);

            await _blogService.Create(input, absolutePath);

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromForm] EditBlogInput input)
        {
            var absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, Blog.IMAGE_PATH);

            await _blogService.Edit(id, input, absolutePath);

            return Ok();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(BlogViewModel))]
        public async Task<IActionResult> Get(int id)
        {
            var blog = await _blogService.Get(id);
            return Ok(BlogViewModel.GetFromBlog.Invoke(blog));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _blogService.Delete(id);

            return Ok();
        }
    }
}
