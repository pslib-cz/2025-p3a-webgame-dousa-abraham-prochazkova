using System.ComponentModel.DataAnnotations;

namespace DAP.Server.Models

{
    public class Item
    {
        [Key]
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public int RoomId { get; set; }

    }
}
