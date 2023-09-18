namespace RecruiterLite.Models.Response;

public class CandidateResponse
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string StreetAddress { get; set; }
    public string PostCode { get; set; }
    public string County { get; set; }
    public string Country { get; set; }
    public int? CompanyId { get; set; }
    public string? CompanyName { get; set; }
    public bool IsHiringManager { get; set; }
}