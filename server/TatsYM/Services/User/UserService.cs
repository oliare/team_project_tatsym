using AutoMapper;
using Microsoft.AspNetCore.Identity;
using TatsYM.Interfaces;
using TatsYM.Data.Entity.Users;
using TatsYM.DTOs;
using TatsYM.DTOs.User;

namespace TatsYM.Services.User
{
    public class UserService
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly IGenericRepository<UserEntity> _genericRepository;
        private readonly IMapper _mapper;

        public UserService(UserManager<UserEntity> userManager, IGenericRepository<UserEntity> genericRepository, IMapper mapper)
        {
            _userManager = userManager;
            _genericRepository = genericRepository;
            _mapper = mapper;
        }

        public async Task<UserDto?> GetUserByIdAsync(string userId)
        {
            var user = await _genericRepository.GetById(userId);
            return user != null ? _mapper.Map<UserDto>(user) : null;
        }

        public async Task<bool> UpdateUserAsync(string userId, UserUpdateDto updatedUserDto)
        {
            var existingUser = await _userManager.FindByIdAsync(userId);
            if (existingUser == null)
                return false;

            _mapper.Map(updatedUserDto, existingUser);
            var result = await _userManager.UpdateAsync(existingUser);
            return result.Succeeded;
        }

        public async Task<bool> ValidatePasswordAsync(string userId, string password)
        {
            var user = await _userManager.FindByIdAsync(userId);
            return user != null && await _userManager.CheckPasswordAsync(user, password);
        }

        public async Task<bool> DeleteUserAsync(string userId, string password)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
                return false;

            var result = await _userManager.DeleteAsync(user);
            return result.Succeeded;
        }

        public async Task<List<UserEntity>> GetUsersByRoleAsync(string roleName)
        {
            var users = await _userManager.GetUsersInRoleAsync(roleName);
            return users.ToList();
        }
    }
}
