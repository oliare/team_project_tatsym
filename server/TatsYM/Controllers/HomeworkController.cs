using Microsoft.AspNetCore.Mvc;
using TatsYM.Data.Entity.HomeworkAssignments;
using TatsYM.DTOs.Homework;
using TatsYM.Repositories.HomeworkAssignmets;
using TatsYM.Services.HomeworkAssignments;

namespace TatsYM.Controllers
{
    [Route("api/[controller]")]
    public class HomeworkController : Controller
    {
        private readonly IHomeworkService _hwService;
        private readonly IHomeworkRepository _hwRepository;

        public HomeworkController(IHomeworkService hwService, IHomeworkRepository hwRepository)
        {
            _hwService = hwService;
            _hwRepository = hwRepository;
        }

        [HttpGet("list")]
        public async Task<ActionResult<List<HomeworkDto>>> List()
        {
            var list = await _hwService.List();
            return Ok(list);
        }

        [HttpGet("details/{id}")]
        public async Task<HomeworkDto> Details(int id)
        {
            return await _hwService.GetById(id);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(HomeworkDto homeworkDto)
        {
            await _hwService.Create(homeworkDto);
            return Ok(homeworkDto);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(HomeworkDto homeworkDto)
        {
            var item = await _hwService.Update(homeworkDto);
            return Ok(item);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var homework = await _hwService.GetById(id);
            if (homework == null) return NotFound();
            await _hwRepository.Delete(id);
            return Ok();
        }

        [HttpGet("subjects")]
        public async Task<List<SubjectEntity>> GetSubjects()
        {
            var subjects = await _hwRepository.GetAllSubjects();
            return subjects;
        }

    }
}