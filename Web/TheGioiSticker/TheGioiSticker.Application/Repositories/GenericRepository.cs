using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TheGioiSticker.Data.Models.Commons;

namespace TheGioiSticker.Application.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        protected DbContext _dbContext { get; set; }

        public GenericRepository(DbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public virtual void Delete(T entity, bool isHardDelete = false)
        {
            if(isHardDelete)
            {
                _dbContext.Set<T>().Remove(entity);
            } else
            {
                entity.isDeleted = true;
                entity.DateDeleted = DateTimeOffset.UtcNow;
            }
        }

        public virtual IQueryable<T> GetAll()
        {
            return _dbContext.Set<T>().AsQueryable();
        }

        public virtual async Task<T> GetById(int id)
        {
            return await _dbContext.Set<T>().FindAsync(id);
        }

        public virtual async Task<T> GetById(Guid id)
        {
            return await _dbContext.Set<T>().FindAsync(id);
        }

        public virtual async Task Create(T entity)
        {
            await _dbContext.Set<T>().AddAsync(entity);
        }

        public virtual Task<IQueryable<T>> FilterByCondition(Expression<Func<T, bool>> expression)
        {
            return Task.FromResult(_dbContext.Set<T>().Where(expression).AsQueryable());
        }

        public virtual async Task Delete(int id, bool isHardDelete = false)
        {
            var entity = await GetById(id);
            Delete(entity, isHardDelete);
        }

        public virtual async Task Delete(Guid id, bool isHardDelete = false)
        {
            var entity = await GetById(id);
            Delete(entity, isHardDelete);
        }

        public virtual async Task SaveChangesAsync()
        {
            await _dbContext.SaveChangesAsync();
        }

        public virtual void SaveChanges()
        {
           _dbContext.SaveChanges();
        }
    }
}
