using RecruiterLite.Models;

namespace RecruiterLite.DataAccess.Specifications;

public class CompaniesSpecification : BaseSpecification<Company>
{
    public CompaniesSpecification(string? sort)
    {
        if (string.IsNullOrEmpty(sort))
        { 
            AddOrderBy(c => c.CompanyName); 
        }
        else 
        {
            switch (sort)
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