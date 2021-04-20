using Infrastructure.FileUtil.Extensions;
using Infrastructure.ListUtil.Extensions.IQueryable;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheGioiSticker.Application.Models.Inputs.Blogs;
using TheGioiSticker.Application.Repositories;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Services.Blogs
{
	public class BlogService
	{
		private readonly IGenericRepository<Blog> _blogService;
		private readonly IConfiguration _configuration;

		public BlogService(IGenericRepository<Blog> blogService, IConfiguration configuration)
		{
			_blogService = blogService;
			_configuration = configuration;
		}


		public async Task Create(CreateBlogInput input, string imageFolderPath)
		{
			var sources = input.Content.GetBase64Sources();
			var extension = "";
			byte[] imageBytes = null;
			string imageName = "";
			foreach (var src in sources)
			{
				extension = src.GetExtensionFromBase64ImageSource();
				imageBytes = Convert.FromBase64String(src.GetValueFromBase64ImageSource());
				imageName = $"{Guid.NewGuid()}.{extension}";
				Upload.ByteArrayToFile($"{imageFolderPath}/{imageName}", imageBytes);
				input.Content = input.Content.Replace(src, $"{_configuration.GetSection("Domain").Value}/{ContentPage.IMAGE_PATH}/{imageName}");
			}

			var blog = new Blog(
				title: input.Title,
				image: await Upload.UploadImageAsync(input.Image, imageFolderPath),
				description: input.Description,
				content: input.Content,
				seoUrl: input.SeoUrl,
				metaDescription: input.MetaDescription,
				metaTitle: input.MetaTitle);

			await _blogService.Create(blog);

			await _blogService.SaveChangesAsync();
		}

		public async Task Edit(int id, EditBlogInput input, string imageFolderPath)
		{
			var blog = await Get(id);

			var sources = input.Content.GetBase64Sources();
			var extension = "";
			byte[] imageBytes = null;
			string imageName = "";
			foreach (var src in sources)
			{
				extension = src.GetExtensionFromBase64ImageSource();
				imageBytes = Convert.FromBase64String(src.GetValueFromBase64ImageSource());
				imageName = $"{Guid.NewGuid()}.{extension}";
				Upload.ByteArrayToFile($"{imageFolderPath}/{imageName}", imageBytes);
				input.Content = input.Content.Replace(src, $"{_configuration.GetSection("Domain").Value}/{Blog.IMAGE_PATH}/{imageName}");
			}

			if (input.Image != null)
			{
				blog.Image = await Upload.UploadImageAsync(input.Image, imageFolderPath);
			}

			blog.Title = input.Title;
			blog.Description = input.Description;
			blog.Content = input.Content;
			blog.SeoUrl = input.SeoUrl;
			blog.MetaTitle = input.MetaTitle;
			blog.MetaDescription = input.MetaDescription;

			await _blogService.SaveChangesAsync();
		}

		public IQueryable<Blog> GetSortedFilteredList(BlogListInput input, out int itemCount)
		{
			return _blogService.GetAll().FilterSortAndGetPage(
				config: input.AsFilterSortPageConfig(),
				args: input,
				itemCount: out itemCount);
		}

		public async Task<Blog> Get(int id)
		{
			return await _blogService.GetById(id);
		}

		public async Task Delete(int id)
		{
			await _blogService.Delete(id, true);

			await _blogService.SaveChangesAsync();
		}
	}
}
