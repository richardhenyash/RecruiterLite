using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RecruiterLite.DataAccess.Interfaces;
using RecruiterLite.Models.Request;
using RecruiterLite.Models.Response;

namespace RecruiterLite.Controllers;
    
[Route("api/[controller]")]
[ApiController]
public class CandidateController : ControllerBase
{
    private readonly ICandidateRepository _candidateRepository;
    private readonly IMapper _mapper;

    public CandidateController(ICandidateRepository candidateRepository, IMapper mapper)
    {
        _candidateRepository = candidateRepository;
        _mapper = mapper;
    }

    // GET: api/Candidate
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CandidateResponse>>> GetCandidates()
    {
        var candidateList = await _candidateRepository.GetCandidatesAsync();
        if (candidateList == null)
        {
            return NotFound("No candidates currently exist in the database.");
        }
        return _mapper.Map<List<CandidateResponse>>(candidateList); ;
    }

    // GET: api/Candidate/1
    [HttpGet("{id}")]
    public async Task<ActionResult<CandidateResponse>> GetCandidate(int id)
    {
        var candidate = await _candidateRepository.GetCandidateByIdAsync(id);
        if (candidate == null)
        {
            return NotFound($"Candidate with id of {id} not found.");
        }
        return _mapper.Map<CandidateResponse>(candidate);
    }

    // POST: api/Candidate/id (id is optional)
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost("{id?}")]
    public async Task<ActionResult<CandidateResponse>> PostCandidate(int? id, CandidateRequest candidateRequest)
    {
        if (id != null && id > 0)
        {
            if (await _candidateRepository.CandidateExists(id.GetValueOrDefault()))
            {
                var candidateFomDb = await _candidateRepository.UpdateCandidate(id.GetValueOrDefault(), candidateRequest);
                return Ok(candidateFomDb);
            }
            return NotFound($"Candidate with id of {id} not found.");
        }
        var newCandidate = await _candidateRepository.AddCandidate(candidateRequest);  
        return CreatedAtAction("GetCandidate", new { id = newCandidate.Id }, newCandidate);
    }

    // DELETE: api/Candidate/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCandidate(int id)
    {
        if (await _candidateRepository.CandidateExists(id))
        {
            var candidateDeleted = await _candidateRepository.DeleteCandidate(id);  
            return Ok(candidateDeleted);
        }
        return NotFound($"Candidate with id of {id} not found.");
    }
}
