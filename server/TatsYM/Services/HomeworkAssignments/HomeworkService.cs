using AutoMapper;
using TatsYM.Data.Entity.HomeworkAssignments;
using TatsYM.DTOs.Homework;
using TatsYM.DTOs.HomeworkAssignments;
using TatsYM.Interfaces.Homework;

namespace TatsYM.Services.HomeworkAssignments
{
    public class HomeworkService : IHomeworkService
    {
        private readonly IHomeworkRepository _hwRepository;
        private readonly IMapper _mapper;

        public HomeworkService(IHomeworkRepository hwRepository, IMapper mapper)
        {
            _hwRepository = hwRepository;
            _mapper = mapper;
        }

        public async Task<List<HomeworkDto>> GetAll()
        {
            var list = await _hwRepository.GetAll();
            var homeworkDto = _mapper.Map<List<HomeworkDto>>(list);
            return homeworkDto;
        }

        public async Task<HomeworkDto> GetById(int id)
        {
            var hw = await _hwRepository.GetById(id);
            return new HomeworkDto
            {
                Id = hw.Id,
                Title = hw.Title,
                Description = hw.Description,
                Logo = hw.Logo,
                FilePath = hw.FilePath,
                IssuedDate = hw.IssuedDate,
                Deadline = hw.Deadline,
                SubjectId = hw.SubjectId
            };
        }

        public async Task<HomeworkDto> Create(HomeworkCreateDto item)
        {
            var hw = _mapper.Map<HomeworkEntity>(item);
            var new_hw = await _hwRepository.Create(hw);
            return _mapper.Map<HomeworkDto>(new_hw);
        }
        
        public async Task<HomeworkDto> Update(HomeworkDto item)
        {
            var hw = _mapper.Map<HomeworkEntity>(item);
            var hw_upd = await _hwRepository.Update(hw);
            return _mapper.Map<HomeworkDto>(hw_upd); 
        }

        public Task Delete(int id)
        {
            return _hwRepository.Delete(id);
        }
    }
}
