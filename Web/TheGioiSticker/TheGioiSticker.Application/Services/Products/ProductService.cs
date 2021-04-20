using Infrastructure.FileUtil.Extensions;
using Infrastructure.ListUtil.Extensions.IQueryable;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheGioiSticker.Application.Models.Inputs.Products;
using TheGioiSticker.Application.Repositories;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Services.Products
{
	public class ProductService
	{
		private readonly IGenericRepository<Product> _productRepo;
		private readonly IConfiguration _configuration;
		public ProductService(IGenericRepository<Product> productRepo, IConfiguration configuration)
		{
			_productRepo = productRepo;
			_configuration = configuration;
		}

		public IQueryable<Product> GetSortedFilteredList(ProductListInput input, out int itemCount)
		{
			return _productRepo.GetAll().FilterSortAndGetPage(
				config: input.AsFilterSortPageConfig(),
				args: input,
				itemCount: out itemCount);
		}

		public async Task<Product> Get(int id)
		{
			return await _productRepo.GetById(id);
		}

		public async Task Create(CreateProductInput input, string imageFolderPath)
		{
			var sources = input.Description.GetBase64Sources();
			var extension = "";
			byte[] imageBytes = null;
			string imageName = "";
			foreach (var src in sources)
			{	
				extension = src.GetExtensionFromBase64ImageSource();
				imageBytes = Convert.FromBase64String(src.GetValueFromBase64ImageSource());
				imageName = $"{Guid.NewGuid()}.{extension}";
				Upload.ByteArrayToFile($"{imageFolderPath}/{imageName}", imageBytes);
				input.Description = input.Description.Replace(src, $"{_configuration.GetSection("Domain").Value}/{Product.IMAGE_PATH}/{imageName}");
			}

			var product = new Product(name: input.Name, 
				productCategoryId: 1,
				code: "product",
				description: input.Description,
				price: input.Price,
				images: string.Join(";", await Task.WhenAll<string>(input.ImageFiles.Select(img => Upload.UploadImageAsync(img, imageFolderPath)))),
				status: input.Status,
				seoUrl: input.SeoUrl,
				metaDescription: input.MetaDescription,
				metaTitle: input.MetaTitle);
			await _productRepo.Create(product);
		}

		public async Task Edit(int id, EditProductInput input, string imageFolderPath)
		{
			var product = await Get(id);
			if(product == null)
			{
				throw new Exception("product not found");
			}

			var sources = input.Description.GetBase64Sources();
			var extension = "";
			byte[] imageBytes = null;
			string imageName = "";
			foreach (var src in sources)
			{
				extension = src.GetExtensionFromBase64ImageSource();
				imageBytes = Convert.FromBase64String(src.GetValueFromBase64ImageSource());
				imageName = $"{Guid.NewGuid()}.{extension}";
				Upload.ByteArrayToFile($"{imageFolderPath}/{imageName}", imageBytes);
				input.Description = input.Description.Replace(src, $"{_configuration.GetSection("Domain").Value}/{Product.IMAGE_PATH}/{imageName}");
			}

			var imgs = new List<string>();
			if (input.ImageLinks != null)
			{ 
				imgs.AddRange(input.ImageLinks.Select(x => x.Replace($"{Product.IMAGE_PATH}/", "")));
			}
			if (input.ImageFiles != null)
			{
				imgs.AddRange(await Task.WhenAll<string>(input.ImageFiles.Select(img => Upload.UploadImageAsync(img, imageFolderPath))));
			}
			product.Images = string.Join(";", imgs);
			product.Name = input.Name;
			product.Code = "product";
			product.Description = input.Description;
			product.Price = input.Price;
			product.Status = input.Status;
			product.SeoUrl = input.SeoUrl;
			product.MetaDescription = input.MetaDescription;
			product.MetaTitle = input.MetaTitle;
		}

		public async Task Delete(int id)
		{
			await _productRepo.Delete(id, true);
		}
	}
}
