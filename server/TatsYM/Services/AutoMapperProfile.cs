using AutoMapper;
using TatsYM.Data.Entity.HomeworkAssignments;
using TatsYM.DTOs.Homework;

namespace TatsYM.Services
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<HomeworkEntity, HomeworkDto>()
               .ForMember(dest => dest.SubjectId, opt => opt.MapFrom(src => src.Subject.Id))
               .ReverseMap();
        }
    }
}
