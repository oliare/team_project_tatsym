using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/home")]
public class HomeController : ControllerBase
{
    private readonly HomeService _userService;

    public HomeController(HomeService userService)
    {
        _userService = userService;
    }

    [HttpGet("students")]
    public async Task<IActionResult> GetStudents()
    {
        var students = await _userService.GetUsersByRoleAsync("Student");
        return Ok(students);
    }
}
