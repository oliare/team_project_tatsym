using AutoMapper;
using AutoMapper.QueryableExtensions;
using TatsYM.Data.Entity.HomeworkAssignments;
using TatsYM.DTOs.Homework;
using TatsYM.Repositories.HomeworkAssignmets;

namespace TatsYM.Services.HomeworkAssignments
{
    public interface IHomeworkService
    {
        Task<List<HomeworkDto>> List();
        Task<HomeworkDto> GetById(int id);
        Task<HomeworkDto> Create(HomeworkDto item);
        Task<HomeworkDto> Update(HomeworkDto item);
    }
    public class HomeworkService : IHomeworkService
    {

        private readonly IHomeworkRepository _hwRepository;
        private readonly IMapper _mapper;

        public HomeworkService(IHomeworkRepository hwRepository, IMapper mapper)
        {
            _hwRepository = hwRepository;
            _mapper = mapper;
        }

        public async Task<List<HomeworkDto>> List()
        {
            var list = await _hwRepository.List();
            var homeworkDto = _mapper.Map<List<HomeworkDto>>(list);
            return homeworkDto;
        }

        public async Task<HomeworkDto> GetById(int id)
        {
            var hw = await _hwRepository.GetById(id);
            return _mapper.Map<HomeworkDto>(hw);
        }

        public async Task<HomeworkDto> Create(HomeworkDto item)
        {
            var subject = await _hwRepository.GetSubjectById(item.SubjectId);

            var hw = _mapper.Map<HomeworkEntity>(item);
            hw.Subject = subject;

            var new_hw = await _hwRepository.Create(hw);

            return _mapper.Map<HomeworkDto>(new_hw);
        }

        public async Task<HomeworkDto> Update(HomeworkDto item)
        {
            var subject = await _hwRepository.GetSubjectById(item.SubjectId);

            var hw = _mapper.Map<HomeworkEntity>(item); 
            hw.Subject = subject;

            var hw_upd = await _hwRepository.Update(hw);

            return _mapper.Map<HomeworkDto>(hw_upd);
        }
    }

}
