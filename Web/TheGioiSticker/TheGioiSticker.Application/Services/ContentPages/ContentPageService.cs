using Infrastructure.FileUtil.Extensions;
using Infrastructure.ListUtil.Extensions.IQueryable;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Threading.Tasks;
using TheGioiSticker.Application.Models.Inputs.ContentPages;
using TheGioiSticker.Application.Repositories;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Services.ContentPages
{
    public class ContentPageService
    {
        private readonly IGenericRepository<ContentPage> _contentPageRepo;
		private readonly IConfiguration _configuration;

		public ContentPageService(IGenericRepository<ContentPage> contentPageRepo, IConfiguration configuration)
        {
			_contentPageRepo = contentPageRepo;
			_configuration = configuration;
		}


		public async Task Create(CreateContentPageInput input, string imageFolderPath)
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

			var contenPage = new ContentPage()
			{
				Title = input.Title,
				Content = input.Content,
				SeoUrl = input.SeoUrl,
				MetaTitle = input.MetaTitle,
				MetaDescription = input.MetaDescription
			};


			await _contentPageRepo.Create(contenPage);

			await _contentPageRepo.SaveChangesAsync();
		}

		public async Task Edit(int id, EditContentPageInput input, string imageFolderPath)
		{
			var contentPageEntity = await Get(id);

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

			contentPageEntity.Title = input.Title;
			contentPageEntity.Content = input.Content;
			contentPageEntity.SeoUrl = input.SeoUrl;
			contentPageEntity.MetaTitle = input.MetaTitle;
			contentPageEntity.MetaDescription = input.MetaDescription;

			await _contentPageRepo.SaveChangesAsync();
		}

		public IQueryable<ContentPage> GetSortedFilteredList(ContentPageListInput input, out int itemCount)
		{
			return _contentPageRepo.GetAll().FilterSortAndGetPage(
				config: input.AsFilterSortPageConfig(),
				args: input,
				itemCount: out itemCount);
		}

		public async Task<ContentPage> Get(int id)
		{
			return await _contentPageRepo.GetById(id);
		}

		public async Task Delete(int id)
		{
			await _contentPageRepo.Delete(id, true);

			await _contentPageRepo.SaveChangesAsync();
		}

	}
}
