using RecruiterLite.DataAccess.Specifications.Interfaces;
using RecruiterLite.Models;

namespace RecruiterLite.DataAccess.Interfaces;

public interface IGenericRepository<T> where T : BaseEntity
{
    public Task<T> GetByIdAsync(int id);
    public Task<IReadOnlyList<T>> GetAllAsync();

    public Task<T> GetEntityWithSpecification(ISpecification<T> specification);

    public Task<IReadOnlyList<T>> GetEntitiesWithSpecification(ISpecification<T> specification);
    public Task<int> CountAsync(ISpecification<T> specification);
    public void Add(T entity);
    public void Update(T entity);
    public void Delete(T entity);
    public void DeleteRange(IEnumerable<T> entities);
    public bool EntityExists(int id);
}