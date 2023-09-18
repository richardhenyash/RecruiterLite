using AutoMapper;
using RecruiterLite.Models;
using RecruiterLite.Models.Request;
using RecruiterLite.Models.Response;

namespace RecruiterLite.Mappings;

public class MappingProfile : Profile {
    public MappingProfile() {
        
        // Candidates
        CreateMap<CandidateRequest, Candidate>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());
        CreateMap<Candidate, CandidateResponse>()
            .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(c => c.Company.CompanyName));
        
        // Companies
        CreateMap<CompanyRequest, Company>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());
        CreateMap<Company, CompanyResponse>()
            .ForMember(dest => dest.HiringManagers, opt => opt.Ignore());
    }
}