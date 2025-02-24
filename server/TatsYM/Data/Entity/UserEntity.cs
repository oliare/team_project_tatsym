using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TatsYM.Data.Entity.Users
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

        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }


    }
}
