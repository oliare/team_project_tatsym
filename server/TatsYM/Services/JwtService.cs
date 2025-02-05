//using Microsoft.Extensions.Configuration;
//using Microsoft.IdentityModel.Tokens;
//using System;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;
//using TatsYum.Models.Users;


//namespace TatsYum.Services
//{
//    public class JwtService
//    {
//        private readonly string _secret;
//        private readonly string _issuer;
//        private readonly string _audience;
//        private readonly int _expirationMinutes;

//        public JwtService(IConfiguration config)
//        {
//            var jwtSettings = config.GetSection("JwtSettings");
//            _secret = jwtSettings["Secret"];
//            _issuer = jwtSettings["Issuer"];
//            _audience = jwtSettings["Audience"];
//            _expirationMinutes = int.Parse(jwtSettings["ExpirationMinutes"]);
//        }

//        public string GenerateToken(User user)
//        {
//            var tokenHandler = new JwtSecurityTokenHandler();
//            var key = Encoding.UTF8.GetBytes(_secret);
//            var claims = new List<Claim>
//            {
//                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
//                new Claim(ClaimTypes.Email, user.Email),
//                new Claim(ClaimTypes.Role, user.Role.ToString())
//            };

//            var tokenDescriptor = new SecurityTokenDescriptor
//            {
//                Subject = new ClaimsIdentity(claims),
//                Expires = DateTime.UtcNow.AddMinutes(_expirationMinutes),
//                Issuer = _issuer,
//                Audience = _audience,
//                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
//            };

//            var token = tokenHandler.CreateToken(tokenDescriptor);
//            return tokenHandler.WriteToken(token);
//        }
//    }
//}
