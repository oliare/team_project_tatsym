using TatsYM.Data.Entity.HomeworkAssignments;
using TatsYM.DTOs.Subject;

namespace TatsYM.Interfaces.Subject
{
    public interface ISubjectRepository : IGenericRepository<SubjectEntity>
    {
        new Task<List<SubjectDto>> GetAll();
        new Task<SubjectDto> GetById(int subjectId);
    }
}
