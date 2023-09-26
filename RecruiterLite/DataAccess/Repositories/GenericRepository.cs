using Microsoft.EntityFrameworkCore;
using RecruiterLite.DataAccess.Interfaces;
using RecruiterLite.DataAccess.Specifications;
using RecruiterLite.DataAccess.Specifications.Interfaces;
using RecruiterLite.Models;

namespace RecruiterLite.DataAccess;

public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
{
    private readonly ApplicationDbContext _context;
    private DbSet<T> _dbSet;
    
    public GenericRepository(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }
    public async Task<T> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task<IReadOnlyList<T>> GetAllAsync(bool? asNoTracking = false)
    {
        if (asNoTracking == true)
        {
            return await _dbSet.AsNoTracking().ToListAsync();
        }
        return await _dbSet.ToListAsync(); 
    }
    
    public void Add(T entity)
    {
        _dbSet.Add(entity);
    }

    public void Update(T entity)
    {
        _dbSet.Attach(entity);
        _context.Entry(entity).State = EntityState.Modified;
    }
    public void Delete(T entity)
    {
        _dbSet.Remove(entity);
    }
    
    public void DeleteRange(IEnumerable<T> entities)
    {
        _dbSet.RemoveRange(entities);
    }
    
    public bool EntityExists(int id)
    {
        return _dbSet.AsNoTracking().Any(e => e.Id == id);
    }
    public async Task<T> GetEntityWithSpecification(ISpecification<T> specification, bool? asNoTracking = false)
    {
        if (asNoTracking == true)
        {
            return await ApplySpecification(specification).AsNoTracking().FirstOrDefaultAsync(); 
        }
        return await ApplySpecification(specification).FirstOrDefaultAsync();
    }
    
    public async Task<int> CountAsync(ISpecification<T> specification)
    {
        return await ApplySpecification(specification).AsNoTracking().CountAsync();
    }
    public async Task<IReadOnlyList<T>> GetEntitiesWithSpecification(ISpecification<T> specification, bool? asNoTracking = false)
    {
        if (asNoTracking == true)
        {
            return await ApplySpecification(specification).AsNoTracking().ToListAsync();
        }
        return await ApplySpecification(specification).ToListAsync();
    }
    private IQueryable<T> ApplySpecification(ISpecification<T> specification)
    {
        return SpecificationEvaluator<T>.GetQuery(_dbSet.AsQueryable(), specification);
    }
    
}