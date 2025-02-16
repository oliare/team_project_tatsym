using Microsoft.AspNetCore.Mvc;
using TatsYM.Data.Entity.HomeworkAssignments;
using TatsYM.DTOs.Homework;
using TatsYM.Repositories.HomeworkAssignmets;
using TatsYum.Data;

namespace TatsYM.Services.HomeworkAssignments
{
    public interface IHomeworkService
    {
        Task<List<HomeworkDto>> List();
        Task<HomeworkDto> GetById(int id);
        Task<HomeworkDto> Create(HomeworkDto item);
        Task<HomeworkDto> Update(HomeworkDto item);
    }
    public class HomeworkService : IHomeworkService
    {

        private readonly IHomeworkRepository _hwRepository;

        public HomeworkService(IHomeworkRepository hwRepository)
        {
            _hwRepository = hwRepository;
        }

        public async Task<List<HomeworkDto>> List()
        {
            var list = await _hwRepository.List();

            var homeworkDto = list.Select(hw => new HomeworkDto
            {
                Id = hw.Id,
                Title = hw.Title,
                Description = hw.Description,
                Logo = hw.Logo,
                FilePath = hw.FilePath,
                IssuedDate = hw.IssuedDate,
                Deadline = hw.Deadline,
                SubjectId = hw.SubjectId
            }).ToList();

            return homeworkDto;
        }

        public async Task<HomeworkDto> GetById(int id)
        {
            var hw = await _hwRepository.GetById(id);
            return new HomeworkDto
            {
                Id = hw.Id,
                Title = hw.Title,
                Description = hw.Description,
                Logo = hw.Logo,
                FilePath = hw.FilePath,
                IssuedDate = hw.IssuedDate,
                Deadline = hw.Deadline,
                SubjectId = hw.SubjectId
            };
        }

        public async Task<HomeworkDto> Create(HomeworkDto item)
        {
            var subject = await _hwRepository.GetSubjectById(item.SubjectId);

            var hw = new HomeworkEntity
            {
                Id = item.Id,
                Title = item.Title,
                Description = item.Description,
                Logo = item.Logo,
                FilePath = item.FilePath,
                IssuedDate = item.IssuedDate,
                Deadline = item.Deadline,
                Subject = subject
            };

            var new_hw = await _hwRepository.Create(hw);

            return new HomeworkDto
            {
                Id = new_hw.Id,
                Title = new_hw.Title,
                Description = new_hw.Description,
                Logo = new_hw.Logo,
                FilePath = new_hw.FilePath,
                IssuedDate = new_hw.IssuedDate,
                Deadline = new_hw.Deadline,
                SubjectId = new_hw.SubjectId
            };
        }

        public async Task<HomeworkDto> Update(HomeworkDto item)
        {
            var subject = await _hwRepository.GetSubjectById(item.SubjectId);

            var hw = new HomeworkEntity
            {
                Id = item.Id,
                Title = item.Title,
                Description = item.Description,
                Logo = item.Logo,
                FilePath = item.FilePath,
                IssuedDate = item.IssuedDate,
                Deadline = item.Deadline,
                Subject = subject
            };

            var new_hw = await _hwRepository.Update(hw);

            return new HomeworkDto
            {
                Id = new_hw.Id,
                Title = new_hw.Title,
                Description = new_hw.Description,
                Logo = new_hw.Logo,
                FilePath = new_hw.FilePath,
                IssuedDate = new_hw.IssuedDate,
                Deadline = new_hw.Deadline,
                SubjectId = new_hw.SubjectId
            };
        }
    }

}
