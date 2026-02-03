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
            var scene = await _db.Scene
                .Include(s => s.Zones)
                    .ThenInclude(z => z.RequiredItem)
                .Include(s => s.Zones)
                    .ThenInclude(z => z.GetItem)
                .FirstOrDefaultAsync(s => s.UserId == userId);

            if (scene == null) return NotFound();

            return Ok(scene);
        }

        [HttpGet("{userId}/zones")]
        public async Task<IActionResult> GetZonesByScene(int userId)
        {
            var zones = await _db.Zones
                .Include(z => z.RequiredItem)
                .Include(z => z.GetItem)
                .Where(z => z.UserId == userId)
                .ToListAsync();

            if (zones == null || !zones.Any())
                return NotFound($"Uživatel/Scéna s ID {userId} nemá žádné zóny.");

            return Ok(zones);
        }
    }
}