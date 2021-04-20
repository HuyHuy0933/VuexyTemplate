using Infrastructure.FileUtil.Extensions;
using Infrastructure.ListUtil.Extensions.IQueryable;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using TheGioiSticker.Application.Models.Inputs.Shapes;
using TheGioiSticker.Application.Repositories;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Services.Shapes
{
	public class ShapeService
	{
		private readonly IGenericRepository<Shape> _shapeRepo;
		public ShapeService(IGenericRepository<Shape> shapeRepo)
		{
			_shapeRepo = shapeRepo;
		}

		public IQueryable<Shape> GetSortedFilteredList(ShapeListInput input, out int itemCount)
		{
			return _shapeRepo.GetAll().AsNoTracking().FilterSortAndGetPage(
				config: input.AsFilterSortPageConfig(),
				args: input,
				itemCount: out itemCount);
		}

		public async Task<Shape> Get(int id)
		{
			return await _shapeRepo.GetById(id);
		}

		public async Task Edit(int id, EditShapeInput input, string imageFolderPath)
		{
			var shape = await Get(id);
			if (input.Image != null)
			{
				shape.Image = await Upload.UploadImageAsync(input.Image, imageFolderPath);
			}
			shape.Name = input.Name;
			shape.Status = input.Status;
			shape.Description = input.Description;

			await _shapeRepo.SaveChangesAsync();
		}

		public async Task Create(CreateShapeInput input, string imageFolderPath)
		{
			var imageName = await Upload.UploadImageAsync(input.Image, imageFolderPath);
			var shape = new Shape(image: imageName,
				name: input.Name,
				status: input.Status,
				description: input.Description);
			await _shapeRepo.Create(shape);

			await _shapeRepo.SaveChangesAsync();
		}

		public async Task Delete(int id)
		{
			await _shapeRepo.Delete(id, true);

			await _shapeRepo.SaveChangesAsync();
		}
	}
}
