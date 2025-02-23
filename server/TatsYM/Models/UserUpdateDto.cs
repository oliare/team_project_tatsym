namespace TatsYM.DTOs.Users
{
    public class UserUpdateDto
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Avatar { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool IsActive { get; set; }
    }
}
