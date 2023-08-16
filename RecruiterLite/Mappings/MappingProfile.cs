using AutoMapper;
using RecruiterLite.Models;
using RecruiterLite.Models.Request;
using RecruiterLite.Models.Response;

namespace RecruiterLite.Mappings;

public class MappingProfile : Profile {
    public MappingProfile() {
        // Add as many of these lines as you need to map your objects
        CreateMap<CandidateRequest, Candidate>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());
        CreateMap<Candidate, CandidateResponse>();
    }
}