using RecruiterLite.Models;

namespace RecruiterLite.DataAccess.Specifications;

public class CandidatesWithCompaniesSpecification : BaseSpecification<Candidate>
{
    public CandidatesWithCompaniesSpecification()
    {
        AddInclude(c => c.Company);
    }
    
    public CandidatesWithCompaniesSpecification(int id)
        : base(c => c.Id == id)
    {
        AddInclude(c => c.Company);
    }
}