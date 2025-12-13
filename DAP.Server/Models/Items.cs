using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAP.Server.Models

{
    public class Item
    {
        [Key]
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public string ImageURL { get; set; }

        [ForeignKey(nameof(Scene))]
        public int RoomId { get; set; }
        public Scene? Scene { get; set; }

    }
}
