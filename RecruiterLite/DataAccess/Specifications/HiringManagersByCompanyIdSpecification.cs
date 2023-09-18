using RecruiterLite.Models;

namespace RecruiterLite.DataAccess.Specifications;

public class HiringManagersByCompanyIdSpecification : BaseSpecification<Candidate>
{
    public HiringManagersByCompanyIdSpecification(int id)
        : base(c => c.CompanyId == id && c.IsHiringManager) {}
}