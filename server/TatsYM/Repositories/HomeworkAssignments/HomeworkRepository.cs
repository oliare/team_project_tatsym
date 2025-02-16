using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TatsYM.Data.Entity.HomeworkAssignments;
using TatsYM.DTOs.Homework;
using TatsYum.Data;

namespace TatsYM.Repositories.HomeworkAssignmets
{
    public interface IHomeworkRepository
    {
        Task<List<HomeworkEntity>> List();
        Task<HomeworkEntity> GetById(int id);
        Task<HomeworkEntity> Create(HomeworkEntity item);
        Task<HomeworkEntity> Update(HomeworkEntity item);
        Task Delete(int id);
        Task<SubjectEntity> GetSubjectById(int subjectId);
        Task<List<SubjectEntity>> GetAllSubjects();
    }

    public class HomeworkRepository : IHomeworkRepository
    {
        private readonly ApplicationDbContext _context;

        public HomeworkRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<HomeworkEntity>> List()
        {
            return await _context.Homeworks.ToListAsync();
        }

        public async Task<HomeworkEntity> GetById(int id)
        {
            var homework = await _context.Homeworks.FindAsync(id);
            if (homework != null) return homework;
            throw new KeyNotFoundException("Homework not found");
        }

        public async Task<HomeworkEntity> Create(HomeworkEntity item)
        {
            _context.Homeworks.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task Delete(int id)
        {
            var item = await _context.Homeworks.FindAsync(id);
            if (item != null)
            {
                _context.Homeworks.Remove(item);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<HomeworkEntity> Update(HomeworkEntity item)
        {
            _context.Homeworks.Update(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<SubjectEntity> GetSubjectById(int subjectId)
        {
            var item = await _context.Subjects.FindAsync(subjectId);
            if (item == null) throw new Exception("Subject not found");
            return item;
        }

        public async Task<List<SubjectEntity>> GetAllSubjects()
        {
            return await _context.Subjects.ToListAsync();
        }

    }
}
