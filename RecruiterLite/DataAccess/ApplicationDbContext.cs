using RecruiterLite.Models;
using Microsoft.EntityFrameworkCore;
namespace RecruiterLite.DataAccess;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }
    public DbSet<Candidate> Candidates { get; set; }
    public DbSet<Company> Company { get; set; }
    
}