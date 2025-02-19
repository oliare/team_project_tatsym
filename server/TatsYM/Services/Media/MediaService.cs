using TatsYM.Interfaces.Media;

namespace TatsYM.Services.Media
{
    public class MediaService : IMediaService
    {
        private readonly string _fileFolder;
        private readonly string _imageFolder;
        private readonly string[] ImageExtensions = { ".jpg", ".jpeg", ".png", ".webp" };

        public MediaService()
        {
            _fileFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads", "homework");
            _imageFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads", "images");

            SetupDirectory(_fileFolder);
            SetupDirectory(_imageFolder);
        }

        private void SetupDirectory(string dir)
        {
            if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
        }

        public string SaveFile(string file)
        {
            return SaveFileOrImage(file, _fileFolder);
        }

        public string SaveImage(string image)
        {
            var extension = Path.GetExtension(image).ToLower();

            if (!ImageExtensions.Contains(extension))
            {
                throw new InvalidOperationException("Invalid image format. Allowed: .jpg, .jpeg, .png, .webp");
            }

            return SaveFileOrImage(image, _imageFolder);
        }

        private string SaveFileOrImage(string file, string dir)
        {
            var path = Path.Combine(dir, Path.GetFileName(file));

            try
            {
                using (var source = new FileStream(file, FileMode.Open, FileAccess.Read))
                using (var dest = new FileStream(path, FileMode.Create))
                {
                    source.CopyTo(dest);
                }
                return path;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Error saving file", ex);
            }
        }

        public void DeleteFile(string file)
        {
            if (File.Exists(file)) File.Delete(file);
        }
    }
}
