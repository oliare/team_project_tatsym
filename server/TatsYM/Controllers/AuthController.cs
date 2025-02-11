using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TatsYum.Models.Users;
using TatsYum.Services;

namespace TatsYum.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterModel model)
        {
            var (success, token, error) = await _authService.RegisterAsync(model);
            if (!success)
            {
                return BadRequest(new { message = error });
            }

            return Ok(new { token });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var (success, token, error) = await _authService.LoginAsync(model);
            if (!success)
            {
                return Unauthorized(new { message = error });
            }

            return Ok(new { token });
        }

    }
}
//throw exception