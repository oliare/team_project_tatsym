using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TatsYum.Models.Users
{
    public class UserEntity : IdentityUser
    {
        [Required]
        [StringLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Url]
        public string? Avatar { get; set; }

        public DateTimeOffset DateCreated { get; private set; } = DateTimeOffset.UtcNow;

        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }


    }
}
