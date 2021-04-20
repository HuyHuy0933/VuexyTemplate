using Infrastructure.FileUtil.Extensions;
using Infrastructure.ListUtil.Extensions.IQueryable;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheGioiSticker.Application.Models.Inputs.ProductCategories;
using TheGioiSticker.Application.Repositories;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Services.ProductCategories
{
	public class ProductCategoryService
	{
		private readonly IGenericRepository<ProductCategory> _productCateRepo;
		private readonly DbContext _dbContext;
		public ProductCategoryService(IGenericRepository<ProductCategory> productCateRepo,
			DbContext dbContext)
		{
			_productCateRepo = productCateRepo;
			_dbContext = dbContext;
		}

		public IQueryable<ProductCategory> GetSortedFilteredList(ProductCategoryListInput input, out int itemCount)
		{
			return _productCateRepo.GetAll().FilterSortAndGetPage(
				config: input.AsFilterSortPageConfig(),
				args: input,
				itemCount: out itemCount);
		}

		public async Task<ProductCategory> Get(int id)
		{
			return await _productCateRepo.GetById(id);
		}

		public async Task Edit(int id, EditProductCategoryInput input, string imageFolderPath)
		{
			var proCate = await Get(id);
			if (input.Image != null)
			{
				proCate.Image = await Upload.UploadImageAsync(input.Image, imageFolderPath);
			}
			proCate.Name = input.Name;
			proCate.Status = input.Status;
			proCate.Url = input.Url;

			await _dbContext.SaveChangesAsync();

		}

		public async Task Create(CreateProductCategoryInput input, string imageFolderPath)
		{
			var imageName = await Upload.UploadImageAsync(input.Image, imageFolderPath);
			var proCate = new ProductCategory(image: imageName,
				name: input.Name,
				status: input.Status,
				url: input.Url);
			await _productCateRepo.Create(proCate);
			await _dbContext.SaveChangesAsync();
		}

		public async Task Delete(int id)
		{
			await _productCateRepo.Delete(id, true);
			await _dbContext.SaveChangesAsync();
		}
	}
}
