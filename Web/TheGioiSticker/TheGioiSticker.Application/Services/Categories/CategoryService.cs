using Infrastructure.FileUtil.Extensions;
using Infrastructure.ListUtil.Extensions.IQueryable;
using System.Linq;
using System.Threading.Tasks;
using TheGioiSticker.Application.Models.Inputs.Categories;
using TheGioiSticker.Application.Repositories;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Services.Categories
{
    public class CategoryService
    {
        private readonly IGenericRepository<Category> _categoryRepo;

        public CategoryService(IGenericRepository<Category> categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

        public async Task<Category> Get(int id)
        {
            return await _categoryRepo.GetById(id);
        }

        public async Task Create(CreateCategoryInput input, string imageFolderPath)
        {
            var imageName = await Upload.UploadImageAsync(input.Image, imageFolderPath);
            var category = new Category(image: imageName, 
                name: input.Name, 
                priceUnit: input.PriceUnit, 
                status: input.Status, 
                description: input.Description, 
                url: input.Url);
            await _categoryRepo.Create(category);
        }

        public async Task Edit(int id, EditCategoryInput input, string imageFolderPath)
        {
            var category = await Get(id);
            if(input.Image != null)
            {
                category.Image = await Upload.UploadImageAsync(input.Image, imageFolderPath);
            }
            category.Name = input.Name;
            category.PriceUnit = input.PriceUnit;
            category.Status = input.Status;
            category.Description = input.Description;
            category.Url = input.Url;
        }

        public IQueryable<Category> GetSortedFilteredList(CategoryListInput input, out int itemCount)
        {
            return _categoryRepo.GetAll().FilterSortAndGetPage(
                config: input.AsFilterSortPageConfig(),
                args: input,
                itemCount: out itemCount);
        }

        public async Task Delete(int id)
        {
            await _categoryRepo.Delete(id, true);
        }
    }
}
