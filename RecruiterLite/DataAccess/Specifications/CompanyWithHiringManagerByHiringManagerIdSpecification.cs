using RecruiterLite.Models;

namespace RecruiterLite.DataAccess.Specifications;

public class CompanyWithHiringManagerByHiringManagerIdSpecification : BaseSpecification<Company>
{
    public CompanyWithHiringManagerByHiringManagerIdSpecification(int id)
        : base(c => c.HiringManagerId == id)
    {
        AddInclude(c => c.Candidate);
    }
}