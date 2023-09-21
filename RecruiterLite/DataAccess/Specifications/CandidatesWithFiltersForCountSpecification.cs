using RecruiterLite.Models;

namespace RecruiterLite.DataAccess.Specifications;

public class CandidatesWithFiltersForCountSpecification : BaseSpecification<Candidate>
{
    public CandidatesWithFiltersForCountSpecification(CandidateSpecParams? candidateParams) :
        base(c => 
            string.IsNullOrEmpty(candidateParams.Search) || (c.FirstName.ToLower().Contains(candidateParams.Search) || c.LastName.ToLower().Contains(candidateParams.Search))
            && !candidateParams.CompanyId.HasValue || c.CompanyId == candidateParams.CompanyId)
    {
        
    }
}