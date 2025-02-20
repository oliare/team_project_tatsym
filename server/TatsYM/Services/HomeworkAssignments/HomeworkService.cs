using AutoMapper;
using TatsYM.Data.Entity.HomeworkAssignments;
using TatsYM.DTOs.HomeworkAssignments;
using TatsYM.Interfaces;
using TatsYM.Interfaces.Homework;
using TatsYM.Interfaces.Media;

namespace TatsYM.Services.HomeworkAssignments
{
    public class HomeworkService : IHomeworkService
    {
        private readonly IGenericRepository<HomeworkEntity> _context;
        private readonly IMapper _mapper;
        private readonly IMediaService _mediaService;

        public HomeworkService(IGenericRepository<HomeworkEntity> context, IMapper mapper, IMediaService mediaService)
        {
            _context = context;
            _mapper = mapper;
            _mediaService = mediaService;
        }

        public async Task<List<HomeworkDto>> GetAll()
        {
            var list = await _context.GetAll();
            var homeworkDto = _mapper.Map<List<HomeworkDto>>(list);
            return homeworkDto;
        }

        public async Task<HomeworkDto> GetById(int id)
        {
            var hw = await _context.GetById(id);
            return _mapper.Map<HomeworkDto>(hw);
        }

        public async Task<HomeworkDto> Create(HomeworkCreateDto item)
        {
            string logoPath = _mediaService.SaveImage(item.Logo);
            string filePath = _mediaService.SaveFile(item.FilePath);

            var hw = _mapper.Map<HomeworkEntity>(item);
            hw.Logo = logoPath;
            hw.FilePath = filePath;

            var new_hw = await _context.Create(hw);
            return _mapper.Map<HomeworkDto>(new_hw);
        }
        
        public async Task<HomeworkDto> Update(HomeworkDto item)
        {
            var hw = await _context.GetById(item.Id);
            if (hw == null) throw new KeyNotFoundException("Homework not found");

            _mapper.Map(item, hw);

            var hw_upd = await _context.Update(hw);
            return _mapper.Map<HomeworkDto>(hw_upd);
        }

        public Task Delete(int id)
        {
            var hw = _context.GetById(id).Result; 
            if (hw == null) throw new KeyNotFoundException("Homework not found");

            if (!string.IsNullOrEmpty(hw.Logo))
                _mediaService.DeleteFile(hw.Logo);

            if (!string.IsNullOrEmpty(hw.FilePath))
                _mediaService.DeleteFile(hw.FilePath);

            return _context.Delete(id);
        }
    }
}
