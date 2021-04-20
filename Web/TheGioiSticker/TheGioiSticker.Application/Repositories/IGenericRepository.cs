using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TheGioiSticker.Data.Models.Commons;

namespace TheGioiSticker.Application.Repositories
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetById(int id);
        Task<T> GetById(Guid id);
        IQueryable<T> GetAll();
        Task Delete(int id, bool isHardDelete = false);
        Task Delete(Guid id, bool isHardDelete = false);
        void Delete(T entity, bool isHardDelete = false);
        Task Create(T entity);
        Task<IQueryable<T>> FilterByCondition(Expression<Func<T, bool>> expression);
        Task SaveChangesAsync();
        void SaveChanges();
    }
}
