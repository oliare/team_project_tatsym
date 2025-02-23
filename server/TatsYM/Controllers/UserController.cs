using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using TatsYM.Services.User;
using TatsYum.Models.Users;

namespace TatsYum.Controllers
{
    [Route("api/profile")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly ProfileService _profileService;

        public UserController(ProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var user = await _profileService.GetProfileByIdAsync(userId);
            return user != null ? Ok(user) : NotFound("User not found");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromBody] UserEntity updatedUser)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            return await _profileService.UpdateProfileAsync(userId, updatedUser)
                ? NoContent()
                : BadRequest("Could not update profile.");
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteProfile([FromBody] string password)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var isDeleted = await _profileService.DeleteProfileAsync(userId, password);
            if (!isDeleted)
                return BadRequest("Incorrect password.");

            return NoContent();
        }
    }
}
