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
public class CompanyController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public CompanyController(IMapper mapper, IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    // GET: api/Companies
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CompanyResponse>>> GetCompanies()
    {
        var companySpecification = new CompaniesWithHiringManagerSpecification();
        var companyList = await _unitOfWork.Repository<Company>().GetEntitiesWithSpecification(companySpecification);
        if (companyList == null)
        {
            return NotFound("No companies currently exist in the database.");
        }
        return _mapper.Map<List<CompanyResponse>>(companyList); ;
    }
    
    // GET: api/Company/ByHiringManager/id
    [HttpGet("ByHiringManager/{id}")]
    public async Task<ActionResult<CompanyResponse>> GetCompanyByHiringManager(int id)
    {
        var companySpecification = new CompanyWithHiringManagerByHiringManagerIdSpecification(id);
        var company = await _unitOfWork.Repository<Company>().GetEntityWithSpecification(companySpecification);
        if (company == null)
        {
            return NotFound($"No companies are currently linked to hiring manager with id of {id}.");
        }
        return _mapper.Map<CompanyResponse>(company); ;
    }
    
    // GET: api/Company/1
    [HttpGet("{id}")]
    public async Task<ActionResult<CompanyResponse>> GetCompany(int id)
    {
        var companySpecification = new CompaniesWithHiringManagerSpecification(id);
        var company = await _unitOfWork.Repository<Company>().GetEntityWithSpecification(companySpecification);
        if (company == null)
        {
            return NotFound($"Company with id of {id} not found.");
        }
        return _mapper.Map<CompanyResponse>(company);
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
