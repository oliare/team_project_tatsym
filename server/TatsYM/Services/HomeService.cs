using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TatsYum.Models.Users;

public interface HomeService
{
    Task<List<UserEntity>> GetUsersByRoleAsync(string roleName);
}

public class UserService : HomeService
{
    private readonly UserManager<UserEntity> _userManager;

    public UserService(UserManager<UserEntity> userManager)
    {
        _userManager = userManager;
    }

    public async Task<List<UserEntity>> GetUsersByRoleAsync(string roleName)
    {
        var users = await _userManager.GetUsersInRoleAsync(roleName);
        return users.ToList();
    }
}
