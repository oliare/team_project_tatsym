namespace TatsYM.DTOs.Users
{
    public class UserRegisterDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Avatar { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Role { get; set; }
    }
}
