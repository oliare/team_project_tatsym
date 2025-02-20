using System.ComponentModel.DataAnnotations;

namespace TatsYM.DTOs.Subject
{
    public class SubjectDto
    {
        public int Id { get; set; }

        [MaxLength(255)]
        public required string Name { get; set; }
        public List<int> HomeworkIds { get; set; } = [];
    }
}
