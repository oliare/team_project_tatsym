using Microsoft.EntityFrameworkCore;

namespace TatsYum.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<TatsYum.Models.Users.UserEntity>? Users { get; set; }
    }
}
