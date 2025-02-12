namespace TatsYum.Models.Users
{

    public static class UserRoles
    {
        public const string Admin = "Admin";
        public const string Student = "Student";

    }
    public class UserRegisterModel
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? Avatar { get; set; }
        public string Role { get; set; } = UserRoles.Student;
        public DateTime DateOfBirth { get; set; }
    }
}
