using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAP.Server.Models

{
    public class Item
    {
        [Key]
        public int ItemId { get; set; }
        public string ItemName { get; set; } = string.Empty;
        public string ImageURL { get; set; } = string.Empty;
        public ICollection<Zones> Zones { get; set; } = new List<Zones>();

    }
}
