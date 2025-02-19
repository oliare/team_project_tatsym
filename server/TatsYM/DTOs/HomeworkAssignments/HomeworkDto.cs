using System.ComponentModel.DataAnnotations;

namespace TatsYM.DTOs.Homework
{
    public class BaseHomeworkDto
    {
        [MaxLength(255)]
        public required string Title { get; set; }
        public required string Description { get; set; }
        public string? Logo { get; set; }
        public string? FilePath { get; set; }
        public DateTime IssuedDate { get; set; } = DateTime.Now;
        public DateTime Deadline { get; set; } = DateTime.Now;
        public int SubjectId { get; set; }
    }

    public class HomeworkDto : BaseHomeworkDto
    {
        public int Id { get; set; }
    }
}
