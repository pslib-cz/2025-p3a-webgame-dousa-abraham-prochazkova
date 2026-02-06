using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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
        [JsonIgnore]
        [ForeignKey(nameof(UserId))]
        public virtual UserScene? UserScene { get; set; }
        public int? TargetSceneId { get; set; }
        [ForeignKey(nameof(TargetSceneId))]
        public virtual UserScene? TargetScene { get; set; }
        public int? ItemId { get; set; }
        [ForeignKey("ItemId")]
        public Item? Item { get; set; }
        public int? ItemDownId { get; set; }
        [ForeignKey("ItemDownId")]
        public Item? ItemDown { get; set; }

    }
}
