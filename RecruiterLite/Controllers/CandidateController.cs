using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruiterLite.DataAccess;
using RecruiterLite.Models;
using RecruiterLite.Models.Request;
using RecruiterLite.Models.Response;

namespace RecruiterLite.Controllers;
    
[Route("api/[controller]")]
[ApiController]
public class CandidateController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public CandidateController(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    // GET: api/Candidate
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CandidateResponse>>> GetCandidates()
    {
        if (_context.Candidates == null)
        {
            return NotFound();
        }
        var candidateList = await _context.Candidates.ToListAsync();
        return _mapper.Map<List<CandidateResponse>>(candidateList); ;
    }

    // GET: api/Candidate/1
    [HttpGet("{id}")]
    public async Task<ActionResult<CandidateResponse>> GetCandidate(int id)
    {
        if (_context.Candidates == null)
        {
            return NotFound();
        }
        var candidate = await _context.Candidates.FindAsync(id);
        if (candidate == null)
        {
            return NotFound();
        }
        return _mapper.Map<CandidateResponse>(candidate);
    }

    // POST: api/Candidate/id (id is optional)
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost("{id?}")]
    public async Task<ActionResult<CandidateResponse>> PostCandidate(CandidateRequest candidateRequest, int? id)
    {
        if (_context.Candidates == null)
        {
            return Problem("Entity set 'ApplicationDbContext.Candidates'  is null.");
        }

        if (id != null && id > 0)
        {
            var candidateFomDb = await _context.Candidates.FirstOrDefaultAsync(c => c.Id == id);
            if (candidateFomDb == null)
            { 
                return NotFound($"A Candidate with id of {id} does not exist in database.");
            }
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
            return Ok(candidateFomDb);
        }
        
        var newCandidate = _mapper.Map<Candidate>(candidateRequest);
        _context.Candidates.Add(newCandidate);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetCandidate", new { id = newCandidate.Id }, newCandidate);
    }

    // DELETE: api/Candidate/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCandidate(int id)
    {
        if (_context.Candidates == null)
        {
            return NotFound();
        }

        var candidate = await _context.Candidates.FindAsync(id);
        if (candidate == null)
        {
            return NotFound();
        }

        _context.Candidates.Remove(candidate);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private bool CandidateExists(int id)
    {
        return (_context.Candidates?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}
