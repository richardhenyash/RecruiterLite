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
public class CompanyController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public CompanyController(IMapper mapper, IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    // GET: api/Company
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CompanyResponse>>> GetCompanies([FromQuery]CompanySpecParams? companyParams)
    {
        var companySpecification = new CompaniesSpecification(companyParams);
        var companyCountSpecification = new CompaniesWithFiltersForCountSpecification(companyParams);
        var totalItems = await _unitOfWork.Repository<Company>().CountAsync(companyCountSpecification);
        var companyList = await _unitOfWork.Repository<Company>().GetEntitiesWithSpecification(companySpecification, true);
        if (companyList == null)
        {
            return NotFound("No companies currently exist in the database.");
        }
        var companyData = _mapper.Map<List<CompanyResponse>>(companyList);
        foreach (var company in companyData)
        {
            var hiringManagerSpecification = new HiringManagersByCompanyIdSpecification(company.Id);
            var hiringManagers = await _unitOfWork.Repository<Candidate>().GetEntitiesWithSpecification(hiringManagerSpecification, true);
            if (hiringManagers != null)
            {
                company.HiringManagers = _mapper.Map<List<CandidateResponse>>(hiringManagers);
            }
        }
        return Ok(new Pagination<CompanyResponse>(companyParams.PageIndex, companyParams.PageSize, totalItems, companyParams.Search, companyData));
    }
    
    // GET: api/Company/All
    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<CompanyResponse>>> GetAllCompanies()
    {
        var companyList = await _unitOfWork.Repository<Company>().GetAllAsync(true);
        if (companyList == null)
        {
            return NotFound("No companies currently exist in the database.");
        }
        var companyResponse = _mapper.Map<List<CompanyResponse>>(companyList);
        return Ok(companyResponse);
    }
    
    // GET: api/Company/1
    [HttpGet("{id}")]
    public async Task<ActionResult<CompanyResponse>> GetCompany(int id)
    {
        var companySpecification = new CompaniesSpecification(id);
        var company = await _unitOfWork.Repository<Company>().GetEntityWithSpecification(companySpecification, true);
        if (company == null)
        {
            return NotFound($"Company with id of {id} not found.");
        }
        var companyResponse = _mapper.Map<CompanyResponse>(company);
        var hiringManagerSpecification = new HiringManagersByCompanyIdSpecification(id);
        var hiringManagers = await _unitOfWork.Repository<Candidate>().GetEntitiesWithSpecification(hiringManagerSpecification, true);
        if (hiringManagers != null)
        {
            companyResponse.HiringManagers = _mapper.Map<List<CandidateResponse>>(hiringManagers);
        }
        return companyResponse;
    }

    // POST: api/Company
    [HttpPost]
    public async Task<ActionResult<CompanyResponse>> PostCompany(CompanyRequest companyRequest)
    {
        var result = 0;
        if (companyRequest.Id != null && companyRequest.Id > 0)
        {
            var updatedCompany = await _unitOfWork.Repository<Company>().GetByIdAsync(companyRequest.Id.GetValueOrDefault());
            if (updatedCompany == null)
                return NotFound($"Company with id of {companyRequest.Id} not found.");
            updatedCompany = _mapper.Map(companyRequest, updatedCompany);
            _unitOfWork.Repository<Company>().Update(updatedCompany);
            result = await _unitOfWork.Complete();
            return Ok(updatedCompany);
        }
        var newCompany = _mapper.Map<Company>(companyRequest);
        _unitOfWork.Repository<Company>().Add(newCompany);
        result = await _unitOfWork.Complete();
        return CreatedAtAction("GetCompany", new { id = newCompany.Id }, newCompany);
    }

    // DELETE: api/Company/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCompany(int id)
    {
        var companyFromDb = await _unitOfWork.Repository<Company>().GetByIdAsync(id);
        if (companyFromDb != null)
        {
            _unitOfWork.Repository<Company>().Delete(companyFromDb);
            var result = await _unitOfWork.Complete();
            if (result > 0)
            { 
                return Ok();
            }
            return Problem($"Company with id of {id} has not been successfully deleted.");
        }
        return NotFound($"Company with id of {id} not found.");
    }
}
