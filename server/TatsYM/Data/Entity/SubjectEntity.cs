using System.ComponentModel.DataAnnotations;

namespace TatsYM.Data.Entity.HomeworkAssignments
{
    public class SubjectEntity
    {
        public int Id { get; set; }
        [MaxLength(255)]
        public required string Name { get; set; }
        public List<HomeworkEntity> Homeworks { get; set; } = [];
    }
}
