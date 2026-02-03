using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DAP.Server.Models
{
    public class Zones
    {
        [Key]
        public int ZoneId { get; set; }
        public decimal Bottom { get; set; }
        public decimal Left { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public string InteractionName { get; set; } = string.Empty;
        public string InteractionType { get; set; } = string.Empty;
        public int? RequiredItemId { get; set; }
        public virtual Item? RequiredItem { get; set; }
        public int? GetItemId { get; set; }
        public virtual Item? GetItem { get; set; }

        public int UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual UserScene? UserScene { get; set; }

    }
}
