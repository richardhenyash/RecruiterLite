using RecruiterLite.Models;
using RecruiterLite.Models.Request;

namespace RecruiterLite.DataAccess.Interfaces;

public interface ICandidateRepository
{
    public Task<Candidate> AddCandidate(CandidateRequest candidate);
    public Task<Candidate> UpdateCandidate(int id, CandidateRequest candidate);
    public bool CandidateExists(int id);
}