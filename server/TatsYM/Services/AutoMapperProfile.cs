using AutoMapper;
using TatsYM.Data.Entity.HomeworkAssignments;
using TatsYM.DTOs.HomeworkAssignments;
using TatsYM.DTOs.Subject;
using TatsYM.DTOs.User;
using TatsYum.Models.Users;

namespace TatsYM.Services
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<HomeworkCreateDto, HomeworkEntity>();
            CreateMap<HomeworkEntity, HomeworkDto>().ReverseMap();

            CreateMap<SubjectEntity, SubjectDto>().ReverseMap();
            CreateMap<UserUpdateDto, UserEntity>();

            //CreateMap<UserEntity, UserDto>();

        }
    }
}
