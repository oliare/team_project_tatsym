using AutoMapper;
using TatsYM.Data.Entity.HomeworkAssignments;
using TatsYM.DTOs.Subject;
using TatsYM.Interfaces;
using TatsYM.Interfaces.Subject;

namespace TatsYM.Services.Subject
{
    public class SubjectService : ISubjectService
    {
        private readonly IGenericRepository<SubjectEntity> _context;
        private readonly IMapper _mapper;

        public SubjectService(IGenericRepository<SubjectEntity> sbRepository, IMapper mapper)
        {
            _context = sbRepository;
            _mapper = mapper;
        }
        public async Task<List<SubjectDto>> GetAll()
        {
            var list = await _context.GetAll();
            return _mapper.Map<List<SubjectDto>>(list);
        }

        public async Task<SubjectDto> GetById(int id)
        {
            var subject = await _context.GetById(id);
            return _mapper.Map<SubjectDto>(subject);
        }
    }
}
