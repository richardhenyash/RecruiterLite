using System.ComponentModel.DataAnnotations.Schema;

namespace RecruiterLite.Models;

public class Company : BaseEntity
{
    public string CompanyName { get; set; }
    public string PhoneNumber { get; set; }
    public string StreetAddress { get; set; }
    public string PostCode { get; set; }
    public string County { get; set; }
    public string Country { get; set; }

    [ForeignKey("Candidate")]
    public int? HiringManagerId { get; set; }
}