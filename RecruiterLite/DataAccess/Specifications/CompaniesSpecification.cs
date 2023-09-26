using RecruiterLite.Models;

namespace RecruiterLite.DataAccess.Specifications;

public class CompaniesSpecification : BaseSpecification<Company>
{
    public CompaniesSpecification(CompanySpecParams? companyParams):
        base(c => 
            string.IsNullOrEmpty(companyParams.Search) || c.CompanyName.ToLower().Contains(companyParams.Search))
    {
        ApplyPaging(companyParams.PageSize * (companyParams.PageIndex - 1), companyParams.PageSize);
        if (string.IsNullOrEmpty(companyParams.Sort))
        { 
            AddOrderBy(c => c.CompanyName); 
        }
        else 
        {
            switch (companyParams.Sort)
            {
                case "nameAsc":
                    AddOrderBy(c => c.CompanyName);
                    break;
                case "nameDsc":
                    AddOrderByDescending(c => c.CompanyName);
                    break;
                default:
                    AddOrderBy(c => c.CompanyName);
                    break;
            }
        }
    }

    public CompaniesSpecification(int id)
        : base(c => c.Id == id) {}
}