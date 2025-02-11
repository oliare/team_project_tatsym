using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TatsYum.Models.Users;
using TatsYum.Models.Authentication; // Модель AuthResult
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
            AuthResult result = await _authService.RegisterAsync(model);

            if (!result.Success)
            {
                // Можна також кидати виняток, якщо у вас реалізована централізована обробка винятків.
                return BadRequest(new { message = result.ErrorMessage });
            }

            return Ok(new { token = result.Token });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            AuthResult result = await _authService.LoginAsync(model);

            if (!result.Success)
            {
                return Unauthorized(new { message = result.ErrorMessage });
            }

            return Ok(new { token = result.Token });
        }
    }
}
