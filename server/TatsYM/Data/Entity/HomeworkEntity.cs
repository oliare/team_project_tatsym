using System.ComponentModel.DataAnnotations;

namespace TatsYM.Data.Entity.HomeworkAssignments
{
    public class HomeworkEntity
    {
        public int Id { get; set; }
        [MaxLength(255)]
        public required string Title { get; set; }
        public required string Description { get; set; }
        public string? Logo { get; set; }
        public string? FilePath { get; set; }
        public DateTime IssuedDate { get; set; }
        public DateTime Deadline { get; set; }
        public int SubjectId { get; set; }
        public SubjectEntity? Subject { get; set; }
    }
}
