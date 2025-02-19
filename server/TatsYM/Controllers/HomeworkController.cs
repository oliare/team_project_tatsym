using Microsoft.AspNetCore.Mvc;
using TatsYM.DTOs.HomeworkAssignments;
using TatsYM.DTOs.Subject;
using TatsYM.Interfaces.Homework;
using TatsYM.Interfaces.Subject;

namespace TatsYM.Controllers
{
    [Route("api/[controller]")]
    public class HomeworkController : Controller
    {
        private readonly IHomeworkService _hwService;
        private readonly ISubjectService _sbService;

        public HomeworkController(IHomeworkService hwService, ISubjectService sbService)
        {
            _hwService = hwService;
            _sbService = sbService;
        }

        [HttpGet("list")]
        public async Task<ActionResult<List<HomeworkDto>>> List()
        {
            var list = await _hwService.GetAll();
            return Ok(list);
        }

        [HttpGet("details/{id}")]
        public async Task<HomeworkDto> Details(int id)
        {
            return await _hwService.GetById(id);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(HomeworkCreateDto homeworkDto)
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
            await _hwService.Delete(id);
            return Ok();
        }

        [HttpGet("subjects")]
        public async Task<List<SubjectDto>> GetSubjects()
        {
            var subjects = await _sbService.GetAll();
            return subjects;
        }

    }
}