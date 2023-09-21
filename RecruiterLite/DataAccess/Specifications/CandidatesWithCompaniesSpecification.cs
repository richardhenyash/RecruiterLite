using RecruiterLite.Models;

namespace RecruiterLite.DataAccess.Specifications;

public class CandidatesWithCompaniesSpecification : BaseSpecification<Candidate>
{
    public CandidatesWithCompaniesSpecification(string? sort, int? companyId) :
        base(c => !companyId.HasValue || c.CompanyId == companyId)
    {
        AddInclude(c => c.Company);
        if (string.IsNullOrEmpty(sort))
        { 
            AddOrderBy(c => c.FirstName + c.LastName); 
        }
        else 
        {
            switch (sort)
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