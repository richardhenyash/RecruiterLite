namespace RecruiterLite.Models.Response;

public class CompanyResponse
{
    public int Id { get; set; }
    public string CompanyName { get; set; }
    public string PhoneNumber { get; set; }
    public string StreetAddress { get; set; }
    public string PostCode { get; set; }
    public string County { get; set; }
    public string Country { get; set; }
    public IReadOnlyList<CandidateResponse>? HiringManagers { get; set; }
}