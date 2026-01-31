using System.ComponentModel.DataAnnotations;

namespace DAP.Server.Models
{
    public class UserScene
    {
        [Key]
        public int UserId { get; set; } //idSceny
        public string Scene { get; set; } = null!;
        public string? SceneImage { get; set; }
        public ICollection<Item>? Item { get; set; }
        public ICollection<Zones> Zones { get; set; } = new List<Zones>();
    }
}
