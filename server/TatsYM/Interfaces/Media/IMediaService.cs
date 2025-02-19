namespace TatsYM.Interfaces.Media
{
    public interface IMediaService
    {
        string SaveFile(string file);
        string SaveImage(string image);
        void DeleteFile(string file);
    }
}
