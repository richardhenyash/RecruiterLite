using System.Collections;
using RecruiterLite.DataAccess.Interfaces;
using RecruiterLite.Models;

namespace RecruiterLite.DataAccess.Specifications;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    private Hashtable _repositories;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
    {
        if (_repositories == null) _repositories = new Hashtable();
        var type = typeof(TEntity).Name;
        if (!_repositories.ContainsKey(type))
        {
            var repositoryType = typeof(GenericRepository<>);
            var repositoryInstance =
                Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), _context);
            _repositories.Add(type, repositoryInstance);
        }
        return (IGenericRepository<TEntity>) _repositories[type];
    }
    
    public void Dispose()
    {
        _context.Dispose();
    }

    public async Task<int> Complete()
    {
        return await _context.SaveChangesAsync();
    }
}