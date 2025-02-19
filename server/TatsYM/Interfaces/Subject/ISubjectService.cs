using TatsYM.DTOs.Subject;

namespace TatsYM.Interfaces.Subject
{
    public interface ISubjectService
    {
        Task<List<SubjectDto>> GetAll();
        Task<SubjectDto> GetById(int id);
    }
}
