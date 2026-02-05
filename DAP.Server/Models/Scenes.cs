using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAP.Server.Models
{
    public class UserScene
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int UserId { get; set; }
        public string Scene { get; set; } = null!;
        public string? SceneImage { get; set; }
        public virtual ICollection<Zones> Zones { get; set; } = new List<Zones>();
    }
}
