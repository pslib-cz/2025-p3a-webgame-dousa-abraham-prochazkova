using DAP.Server.Models;
using DAP.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DAP.Server.Controllers
{
    [ApiController]
    [Route("api/scene")]
    public class SceneController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public SceneController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCurrentScene(int userId)
        {
            var sceneData = await _db.Scene
                .Where(s => s.UserId == userId)
                .Select(s => new
                {
                    userId = s.UserId,
                    scene = s.Scene,
                    sceneImage = s.SceneImage,
                    zones = s.Zones.Select(z => new
                    {
                        zoneId = z.ZoneId,
                        bottom = z.Bottom,
                        left = z.Left,
                        width = z.Width,
                        height = z.Height,
                        interactionName = z.InteractionName,
                        interactionType = z.InteractionType,
                        requiredItemId = z.RequiredItemId,
                        requiredItem = z.RequiredItem != null ? new
                        {
                            itemId = z.RequiredItem.ItemId,
                            itemName = z.RequiredItem.ItemName,
                            imageURL = z.RequiredItem.ImageURL
                        } : null,
                        getItemId = z.GetItemId,
                        getItem = z.GetItem != null ? new
                        {
                            itemId = z.GetItem.ItemId,
                            itemName = z.GetItem.ItemName,
                            imageURL = z.GetItem.ImageURL
                        } : null
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (sceneData == null) return NotFound();

            return Ok(sceneData);
        }
    }
}