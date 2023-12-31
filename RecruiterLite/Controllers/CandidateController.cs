using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RecruiterLite.DataAccess.Interfaces;
using RecruiterLite.DataAccess.Specifications;
using RecruiterLite.Models;
using RecruiterLite.Models.Pagination;
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

    // GET: api/Candidates
    [HttpGet]
    public async Task<ActionResult<Pagination<CandidateResponse>>> GetCandidates([FromQuery]CandidateSpecParams? candidateParams)
    {
        var candidateSpecification = new CandidatesWithCompaniesSpecification(candidateParams);
        var candidateCountSpecification = new CandidatesWithFiltersForCountSpecification(candidateParams);
        var totalItems = await _unitOfWork.Repository<Candidate>().CountAsync(candidateCountSpecification);
        var candidateList = await _unitOfWork.Repository<Candidate>().GetEntitiesWithSpecification(candidateSpecification, true);
        if (candidateList == null)
        {
            return NotFound("No candidates currently exist in the database.");
        }
        var candidateData = _mapper.Map<List<CandidateResponse>>(candidateList);
        return Ok(new Pagination<CandidateResponse>(candidateParams.PageIndex, candidateParams.PageSize, totalItems, candidateParams.Search, candidateData));
    }
    
    // GET: api/Candidate/1
    [HttpGet("{id}")]
    public async Task<ActionResult<CandidateResponse>> GetCandidate(int id)
    {
        var candidateSpecification = new CandidatesWithCompaniesSpecification(id);
        var candidate = await _unitOfWork.Repository<Candidate>().GetEntityWithSpecification(candidateSpecification, true);
        if (candidate == null)
        {
            return NotFound($"Candidate with id of {id} not found.");
        }
        return _mapper.Map<CandidateResponse>(candidate);
    }

    // POST: api/Candidate
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
                return Ok();   
            }
            return Problem($"Candidate with id of {id} has not been successfully deleted.");
        }
        return NotFound($"Candidate with id of {id} not found.");
    }
}
