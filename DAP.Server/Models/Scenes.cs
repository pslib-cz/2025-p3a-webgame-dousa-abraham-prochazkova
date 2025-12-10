using System.ComponentModel.DataAnnotations;

namespace DAP.Server.Models
{
    public class Scene
    {
        [Key]
        public int RoomId { get; set; }
        public string RoomName { get; set; }
    }
}
