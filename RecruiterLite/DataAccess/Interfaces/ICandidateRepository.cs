using RecruiterLite.Models;
using RecruiterLite.Models.Request;

namespace RecruiterLite.DataAccess.Interfaces;

public interface ICandidateRepository
{
    public Task<Candidate> GetCandidateByIdAsync(int id);
    
    public Task<Candidate> AddCandidate(CandidateRequest candidate);
    
    public Task<Candidate> UpdateCandidate(int id, CandidateRequest candidate);
    
    public Task<bool> DeleteCandidate(int id);
    public Task<IReadOnlyList<Candidate>> GetCandidatesAsync();
    public Task<bool> CandidateExists(int id);
}