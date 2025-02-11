using Microsoft.AspNetCore.Identity;

namespace TatsYum.Models.Users
{
    public class RoleEntity : IdentityRole
    {
        public RoleEntity() : base() { }

        public RoleEntity(string roleName) : base(roleName) { }
    }
}
