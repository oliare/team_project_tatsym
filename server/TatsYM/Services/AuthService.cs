using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TatsYM.Data.Entity.Users;
using TatsYM.DTOs.Autorise;

namespace TatsYum.Services
{
    public class AuthService
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly SignInManager<UserEntity> _signInManager;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AuthService(UserManager<UserEntity> userManager, SignInManager<UserEntity> signInManager, IConfiguration config, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
            _mapper = mapper;
        }

        public async Task<AuthResult> RegisterAsync(UserRegisterDto model)
        {
            var user = _mapper.Map<UserEntity>(model);

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return new AuthResult
                {
                    Success = false,
                    ErrorMessage = string.Join(", ", result.Errors.Select(e => e.Description))
                };
            }

            await _userManager.AddToRoleAsync(user, model.Role.ToString());

            return new AuthResult
            {
                Success = true,
                Token = await GenerateJwtToken(user)
            };
        }

        public async Task<AuthResult> LoginAsync(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return new AuthResult
                {
                    Success = false,
                    ErrorMessage = "Invalid email or password."
                };
            }

            var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);
            if (!result.Succeeded)
            {
                return new AuthResult
                {
                    Success = false,
                    ErrorMessage = "Invalid email or password."
                };
            }

            return new AuthResult
            {
                Success = true,
                Token = await GenerateJwtToken(user)
            };
        }

        private async Task<string> GenerateJwtToken(UserEntity user)
        {
            var jwtSettings = _config.GetSection("JwtSettings");
            var key = Encoding.UTF8.GetBytes(jwtSettings["Secret"]!);
            var tokenLifetimeMinutes = jwtSettings.GetValue<int>("TokenLifetimeMinutes");

            var roles = await _userManager.GetRolesAsync(user);

            var tokenHandler = new JwtSecurityTokenHandler();

            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Email, user.Email ?? string.Empty),
                    new Claim(ClaimTypes.GivenName, user.FirstName),
                    new Claim(ClaimTypes.Surname, user.LastName),
                }.Concat(roles.Select(role => new Claim(ClaimTypes.Role, role)))),

                Expires = DateTime.UtcNow.AddMinutes(tokenLifetimeMinutes),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
