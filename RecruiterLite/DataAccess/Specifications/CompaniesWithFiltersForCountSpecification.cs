using RecruiterLite.Models;

namespace RecruiterLite.DataAccess.Specifications;

public class CompaniesWithFiltersForCountSpecification : BaseSpecification<Company>
{
    public CompaniesWithFiltersForCountSpecification(CompanySpecParams? companyParams):
        base(c => 
            string.IsNullOrEmpty(companyParams.Search) || c.CompanyName.ToLower().Contains(companyParams.Search))
    {
        
    }
}