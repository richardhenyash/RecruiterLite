using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecruiterLite.Models;

public class Candidate: BaseEntity
{ 
    public string FirstName { get; set; }
    public string LastName { get; set; }
    [EmailAddress]
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string StreetAddress { get; set; }
    public string PostCode { get; set; }
    public string County { get; set; }
    public string Country { get; set; }
        
    [ForeignKey("CompanyId")]
    public int? CompanyId { get; set; }
}