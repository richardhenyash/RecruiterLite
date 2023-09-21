using Microsoft.EntityFrameworkCore;
using RecruiterLite.DataAccess.Specifications.Interfaces;
using RecruiterLite.Models;

namespace RecruiterLite.DataAccess.Specifications;

public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
{
    public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, ISpecification<TEntity> spec)
    {
        var query = inputQuery;
        if (spec.Criteria != null)
        {
            query = query.Where(spec.Criteria);
        }
        
        if (spec.OrderBy != null)
        {
            query = query.OrderBy(spec.OrderBy);
        }
        
        if (spec.OrderByDescending != null)
        {
            query = query.OrderByDescending(spec.OrderByDescending);
        }
        
        query = spec.Includes.Aggregate(query, (current, include) => current.Include(include));
        return query;
    }
}