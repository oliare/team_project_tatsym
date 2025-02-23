using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TatsYM.Interfaces;
using TatsYum.Models.Users;

namespace TatsYM.Services.User
{
    public class UserService
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly IGenericRepository<UserEntity> _genericRepository;

        public UserService(UserManager<UserEntity> userManager, IGenericRepository<UserEntity> genericRepository)
        {
            _userManager = userManager;
            _genericRepository = genericRepository;
        }

        public async Task<UserEntity?> GetProfileByIdAsync(string userId)
        {
            return await _genericRepository.GetById(userId);
        }

        public async Task<bool> UpdateProfileAsync(string userId, UserEntity updatedUser)
        {
            var existingUser = await _userManager.FindByIdAsync(userId);
            if (existingUser == null)
                return false;

            existingUser.FirstName = updatedUser.FirstName;
            existingUser.LastName = updatedUser.LastName;
            existingUser.Avatar = updatedUser.Avatar;
            existingUser.DateOfBirth = updatedUser.DateOfBirth;

            var result = await _userManager.UpdateAsync(existingUser);
            return result.Succeeded;
        }

        public async Task<bool> ValidatePasswordAsync(string userId, string password)
        {
            var user = await _userManager.FindByIdAsync(userId);
            return user != null && await _userManager.CheckPasswordAsync(user, password);
        }

        public async Task<bool> DeleteProfileAsync(string userId, string password)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return false;

            if (!await _userManager.CheckPasswordAsync(user, password))
                return false;

            var result = await _userManager.DeleteAsync(user);
            return result.Succeeded;
        }
    }
}
