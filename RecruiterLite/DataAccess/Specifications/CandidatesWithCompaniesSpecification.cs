using RecruiterLite.Models;

namespace RecruiterLite.DataAccess.Specifications;

public class CandidatesWithCompaniesSpecification : BaseSpecification<Candidate>
{
    public CandidatesWithCompaniesSpecification(CandidateSpecParams? candidateParams) :
        base(c => 
            string.IsNullOrEmpty(candidateParams.Search) || (c.FirstName.ToLower().Contains(candidateParams.Search) || c.LastName.ToLower().Contains(candidateParams.Search))
            && !candidateParams.CompanyId.HasValue || c.CompanyId == candidateParams.CompanyId)
    {
        AddInclude(c => c.Company);
        ApplyPaging(candidateParams.PageSize * (candidateParams.PageIndex - 1), candidateParams.PageSize);
        if (string.IsNullOrEmpty(candidateParams?.Sort))
        { 
            AddOrderBy(c => c.FirstName + c.LastName); 
        }
        else 
        {
            switch (candidateParams.Sort)
            {
                case "nameAsc":
                    AddOrderBy(c => c.FirstName + c.LastName);
                    break;
                case "nameDsc":
                    AddOrderByDescending(c => c.FirstName + c.LastName);
                    break;
                case "companyNameAsc":
                    AddOrderBy(c => c.Company.CompanyName);
                    break;
                case "companyNameDsc":
                    AddOrderByDescending(c => c.Company.CompanyName);
                    break;
                default:
                    AddOrderBy(c => c.FirstName + c.LastName);
                    break;
            }
        }
    }
    
    public CandidatesWithCompaniesSpecification(int id)
        : base(c => c.Id == id)
    {
        AddInclude(c => c.Company);
    }
}