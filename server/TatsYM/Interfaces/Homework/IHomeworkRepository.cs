using TatsYM.Data.Entity.HomeworkAssignments;

namespace TatsYM.Interfaces.Homework
{
    public interface IHomeworkRepository : IGenericRepository<HomeworkEntity>
    {
        new Task<List<HomeworkEntity>> GetAll();
        new Task<HomeworkEntity> GetById(int id);
        new Task<HomeworkEntity> Create(HomeworkEntity item);
        new Task<HomeworkEntity> Update(HomeworkEntity item);
        new Task Delete(int id);
    }
}
