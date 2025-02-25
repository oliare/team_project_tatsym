using AutoMapper;
using TatsYM.Data.Entity.HomeworkAssignments;
using TatsYM.DTOs.HomeworkAssignments;
using TatsYM.DTOs.Subject;
using TatsYM.DTOs.User;
using TatsYM.Data.Entity.Users;
using TatsYM.DTOs.Autorise;

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

            CreateMap<UserEntity, UserDto>();
            CreateMap<UserRegisterDto, UserEntity>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email));
        }
    }
}
