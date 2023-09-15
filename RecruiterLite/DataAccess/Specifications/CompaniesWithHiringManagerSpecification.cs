using RecruiterLite.Models;

namespace RecruiterLite.DataAccess.Specifications;

public class CompaniesWithHiringManagerSpecification : BaseSpecification<Company>
{
    public CompaniesWithHiringManagerSpecification()
    {
        AddInclude(c => c.Candidate);
    }
    
    public CompaniesWithHiringManagerSpecification(int id)
        : base(c => c.Id == id)
    {
        AddInclude(c => c.Candidate);
    }
}