using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RecruiterLite.DataAccess.Interfaces;
using RecruiterLite.DataAccess.Specifications;
using RecruiterLite.Models;
using RecruiterLite.Models.Request;
using RecruiterLite.Models.Response;

namespace RecruiterLite.Controllers;
    
[Route("api/[controller]")]
[ApiController]
public class CandidateController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public CandidateController(IMapper mapper, IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    // GET: api/Candidate
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CandidateResponse>>> GetCandidates()
    {
        var candidateSpecification = new CandidatesWithCompaniesSpecification();
        var candidateList = await _unitOfWork.Repository<Candidate>().GetEntitiesWithSpecification(candidateSpecification);
        if (candidateList == null)
        {
            return NotFound("No candidates currently exist in the database.");
        }
        return _mapper.Map<List<CandidateResponse>>(candidateList); ;
    }
    
    // GET: api/Candidate/ByCompany/id
    [HttpGet("ByCompany/{id}")]
    public async Task<ActionResult<IEnumerable<CandidateResponse>>> GetCandidatesByCompany(int id)
    {
        var candidateSpecification = new CandidatesWithCompaniesByCompanyIdSpecification(id);
        var candidateList = await _unitOfWork.Repository<Candidate>().GetEntitiesWithSpecification(candidateSpecification);
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
        var candidateSpecification = new CandidatesWithCompaniesSpecification(id);
        var candidate = await _unitOfWork.Repository<Candidate>().GetEntityWithSpecification(candidateSpecification);
        if (candidate == null)
        {
            return NotFound($"Candidate with id of {id} not found.");
        }
        return _mapper.Map<CandidateResponse>(candidate);
    }

    // POST: api/Candidate/id (id is optional)
    [HttpPost]
    public async Task<ActionResult<CandidateResponse>> PostCandidate(CandidateRequest candidateRequest)
    {
        var result = 0;
        if (candidateRequest.Id != null && candidateRequest.Id > 0)
        {
            var updatedCandidate = await _unitOfWork.Repository<Candidate>().GetByIdAsync(candidateRequest.Id.GetValueOrDefault());
            if (updatedCandidate == null)
                return NotFound($"Candidate with id of {candidateRequest.Id} not found.");
            updatedCandidate = _mapper.Map(candidateRequest, updatedCandidate);
            _unitOfWork.Repository<Candidate>().Update(updatedCandidate);
            result = await _unitOfWork.Complete();
            return Ok(updatedCandidate);
        }
        var newCandidate = _mapper.Map<Candidate>(candidateRequest);
        _unitOfWork.Repository<Candidate>().Add(newCandidate);
        result = await _unitOfWork.Complete();
        return CreatedAtAction("GetCandidate", new { id = newCandidate.Id }, newCandidate);
    }

    // DELETE: api/Candidate/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCandidate(int id)
    {
        var candidateFromDb = await _unitOfWork.Repository<Candidate>().GetByIdAsync(id);
        if (candidateFromDb != null)
        {
            _unitOfWork.Repository<Candidate>().Delete(candidateFromDb);
            var result = await _unitOfWork.Complete();
            if (result > 0)
            {
                return Ok($"Candidate with id of {id} successfully deleted.");   
            }
            return Problem($"Candidate with id of {id} has not been successfully deleted.");
        }
        return NotFound($"Candidate with id of {id} not found.");
    }
}
