using Microsoft.AspNetCore.Identity;

namespace TatsYM.Data.Entity.Users
{
    public class RoleEntity : IdentityRole
    {
        public RoleEntity() : base() { }

        public RoleEntity(string roleName) : base(roleName) { }
    }
}
