using TatsYM.DTOs.HomeworkAssignments;

namespace TatsYM.Interfaces.Homework
{
    public interface IHomeworkService
    {
        Task<List<HomeworkDto>> GetAll();
        Task<HomeworkDto> GetById(int id);
        Task<HomeworkDto> Create(HomeworkCreateDto item);
        Task<HomeworkDto> Update(HomeworkDto item);
        Task Delete(int id);
    }
}
