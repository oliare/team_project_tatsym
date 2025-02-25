using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TatsYM.Services.User;
using TatsYM.DTOs.User;

namespace TatsYum.Controllers
{
    [Route("api/user")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var user = await _userService.GetUserByIdAsync(userId);
            return user != null ? Ok(user) : NotFound("User not found");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] UserUpdateDto updatedUserDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            return await _userService.UpdateUserAsync(userId, updatedUserDto)
                ? NoContent()
                : BadRequest("Could not update user.");
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser([FromBody] string password)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            return await _userService.DeleteUserAsync(userId, password)
                ? NoContent()
                : BadRequest("Incorrect password or could not delete user.");
        }

        [HttpGet("students")]
        public async Task<IActionResult> GetStudents()
        {
            var students = await _userService.GetUsersByRoleAsync("Student");
            return Ok(students);
        }
    }
}
