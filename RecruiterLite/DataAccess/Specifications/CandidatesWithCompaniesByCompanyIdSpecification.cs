using RecruiterLite.Models;

namespace RecruiterLite.DataAccess.Specifications;

public class CandidatesWithCompaniesByCompanyIdSpecification : BaseSpecification<Candidate>
{
    public CandidatesWithCompaniesByCompanyIdSpecification(int id)
        : base(c => c.CompanyId == id)
    {
        AddInclude(c => c.Company);
    }
}