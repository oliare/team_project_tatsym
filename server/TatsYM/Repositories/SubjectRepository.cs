using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TatsYM.Data.Entity.HomeworkAssignments;
using TatsYM.DTOs.Subject;
using TatsYM.Interfaces.Subject;
using TatsYum.Data;

namespace TatsYM.Repositories
{
    public class SubjectRepository : GenericRepository<SubjectEntity>, ISubjectRepository
    {
        private readonly IMapper _mapper;

        public SubjectRepository(ApplicationDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
        }

        public new async Task<List<SubjectDto>> GetAll()
        {
            var list = await _dbSet.ToListAsync();
            return _mapper.Map<List<SubjectDto>>(list);
        }

        public new async Task<SubjectDto> GetById(int id)
        {
            var subject = await _dbSet.FindAsync(id);
            if (subject == null) return null;

            var subjectDto = _mapper.Map<SubjectDto>(subject);
            return subjectDto;
        }
    }
}
