using System.ComponentModel.DataAnnotations;

namespace TatsYum.Models.Users
{
    public enum UserRole
    {
        Teacher,
        Student,
        Admin
    }

    public class UserEntity
    {
        public int Id { get; private set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Url]
        public string? Avatar { get; set; }

        [Required]
        public UserRole Role { get; set; }

        public DateTimeOffset DateCreated { get; private set; } = DateTimeOffset.UtcNow;

        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }

        public bool IsActive { get; set; } = true;
    }
}