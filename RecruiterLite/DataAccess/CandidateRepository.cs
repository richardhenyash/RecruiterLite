using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RecruiterLite.DataAccess.Interfaces;
using RecruiterLite.Models;
using RecruiterLite.Models.Request;

namespace RecruiterLite.DataAccess;

public class CandidateRepository : ICandidateRepository
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public CandidateRepository(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<Candidate> GetCandidateByIdAsync(int id)
    {
        return await _context.Candidates.FindAsync(id);
    }

    public async Task<IReadOnlyList<Candidate>> GetCandidatesAsync()
    {
        return await _context.Candidates.ToListAsync();
    }

    public async Task<Candidate> AddCandidate(CandidateRequest candidateRequest)
    {
        var newCandidate = _mapper.Map<Candidate>(candidateRequest);
        _context.Candidates.Add(newCandidate);
        await _context.SaveChangesAsync();
        return newCandidate;
    }
    
    public async Task<Candidate> UpdateCandidate(int id, CandidateRequest candidateRequest)
    {
        var candidateFomDb = await _context.Candidates.FindAsync(id);
        candidateFomDb.FirstName = candidateRequest.FirstName;
        candidateFomDb.LastName = candidateRequest.LastName;
        candidateFomDb.Email = candidateRequest.Email;
        candidateFomDb.PhoneNumber = candidateRequest.PhoneNumber;
        candidateFomDb.StreetAddress = candidateRequest.StreetAddress;
        candidateFomDb.PostCode = candidateRequest.PostCode;
        candidateFomDb.County = candidateRequest.County;
        candidateFomDb.Country = candidateRequest.Country;
        candidateFomDb.CompanyId = candidateRequest.CompanyId;
        await _context.SaveChangesAsync();
        return candidateFomDb;
    }
    
    public async Task<bool> DeleteCandidate(int id)
    {
        var candidate = await _context.Candidates.FindAsync(id);
        if (candidate == null)
        {
            return false;
        }
        _context.Candidates.Remove(candidate);
        await _context.SaveChangesAsync();
        return true;
    }
    public async Task<bool> CandidateExists(int id)
    {
        return _context.Candidates.Any(e => e.Id == id);
    }
}