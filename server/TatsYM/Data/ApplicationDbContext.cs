using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TatsYM.Data.Entity.HomeworkAssignments;
using TatsYM.Data.Entity.Users;

namespace TatsYum.Data
{
    public class ApplicationDbContext : IdentityDbContext<UserEntity, RoleEntity, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public required DbSet<SubjectEntity> Subjects { get; set; }
        public required DbSet<HomeworkEntity> Homeworks { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<RoleEntity>().HasData(
                new RoleEntity { Id = "a1b2c3d4-e5f6-7a8b-9c0d-123456789abc", Name = "Student", NormalizedName = "STUDENT" },
                new RoleEntity { Id = "b1c2d3e4-f5g6-7h8i-9j0k-234567890def", Name = "Admin", NormalizedName = "ADMIN" }
            );
        }

    }
}
