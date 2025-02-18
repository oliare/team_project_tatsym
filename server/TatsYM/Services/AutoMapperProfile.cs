using AutoMapper;
using TatsYM.Data.Entity.HomeworkAssignments;
using TatsYM.DTOs.Homework;
using TatsYM.DTOs.HomeworkAssignments;
using TatsYM.DTOs.Subject;

namespace TatsYM.Services
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<HomeworkCreateDto, HomeworkEntity>();
            CreateMap<HomeworkEntity, HomeworkDto>().ReverseMap();

            CreateMap<SubjectEntity, SubjectDto>().ReverseMap();
        }
    }
}
