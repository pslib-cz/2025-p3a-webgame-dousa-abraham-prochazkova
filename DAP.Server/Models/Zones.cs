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
        public string InteractionName {  get; set; }
        public string InteractionType { get; set; }
        public string? RequiredItem { get; set; }

        [ForeignKey(nameof(UserScene))]
        public int UserId { get; set; }

    }
}
