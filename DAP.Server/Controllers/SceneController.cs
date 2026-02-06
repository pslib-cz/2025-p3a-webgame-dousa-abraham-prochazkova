using DAP.Server.Data;
using DAP.Server.Models;
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
            var scene = await _db.Scene
                .Include(s => s.Items)
                .Include(s => s.Zones)
                    .ThenInclude(z => z.RequiredItem)
                .Include(s => s.Zones)
                    .ThenInclude(z => z.GetItem)
                .Include(s => s.Zones)
                    .ThenInclude(z => z.TargetScene)
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.UserId == userId);

            if (scene == null) return NotFound();

            return Ok(scene);
        }
        [HttpGet("scene/{userId}/zones")]
        public async Task<IActionResult> GetZonesByScene(int userId)
        {
            var zones = await _db.Zones
                .Include(z => z.Item)
                .Include(z => z.ItemDown)
                .Where(z => z.UserId == userId)
                .ToListAsync();

            return Ok(zones);
        }
    }
}