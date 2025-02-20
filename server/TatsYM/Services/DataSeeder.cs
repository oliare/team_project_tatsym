using TatsYM.Data.Entity.HomeworkAssignments;
using TatsYum.Data;

namespace TatsYM.Services
{
    public class DataSeeder
    {
        private readonly ApplicationDbContext _context;

        public DataSeeder(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SeedSubjects()
        {
            if (!_context.Subjects.Any())
            {
                var subjects = new List<SubjectEntity>
                {
                    new SubjectEntity { Name = "C#" },
                    new SubjectEntity { Name = "Java" },
                    new SubjectEntity { Name = "JavaScript" },
                    new SubjectEntity { Name = "Python" },
                    new SubjectEntity { Name = "C++" },
                    new SubjectEntity { Name = "Ruby" },
                    new SubjectEntity { Name = "PHP" },
                    new SubjectEntity { Name = "Swift" },
                    new SubjectEntity { Name = "Go" },
                    new SubjectEntity { Name = "SQL" }
                };

                _context.Subjects.AddRange(subjects);
                await _context.SaveChangesAsync();
            }
        }
    }
}
