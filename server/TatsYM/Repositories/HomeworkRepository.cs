using TatsYM.Data.Entity.HomeworkAssignments;
using TatsYM.Interfaces.Homework;
using TatsYum.Data;

namespace TatsYM.Repositories
{
    public class HomeworkRepository : GenericRepository<HomeworkEntity>, IHomeworkRepository
    {
        public HomeworkRepository(ApplicationDbContext context) : base(context) { }
    }
}
