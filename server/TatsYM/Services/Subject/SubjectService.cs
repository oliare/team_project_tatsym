using AutoMapper;
using TatsYM.DTOs.Subject;
using TatsYM.Interfaces.Subject;

namespace TatsYM.Services.Subject
{
    public class SubjectService : ISubjectService
    {
        private readonly ISubjectRepository _sbRepository;
        private readonly IMapper _mapper;

        public SubjectService(ISubjectRepository sbRepository, IMapper mapper)
        {
            _sbRepository = sbRepository;
            _mapper = mapper;
        }
        public async Task<List<SubjectDto>> GetAll()
        {
            var list = await _sbRepository.GetAll();
            return _mapper.Map<List<SubjectDto>>(list);
        }

        public async Task<SubjectDto> GetById(int id)
        {
            var subject = await _sbRepository.GetById(id);
            return _mapper.Map<SubjectDto>(subject);
        }
    }
}
