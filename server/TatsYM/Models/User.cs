namespace TatsYum.Models.Users
{
    public class UserRegisterModel
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;  // Пароль для хешування
        public string? Avatar { get; set; }
        public UserRole Role { get; set; } = UserRole.Student; // За замовчуванням студент
        public DateTime DateOfBirth { get; set; }
    }
}
