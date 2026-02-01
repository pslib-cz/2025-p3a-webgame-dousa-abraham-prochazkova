using DAP.Server.Models;
using DAP.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

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
                .Include(s => s.Item) 
                .FirstOrDefaultAsync(s => s.UserId == userId);

            if (scene == null)
                return NotFound();

            return Ok(scene);
        }


        [HttpGet("{userId}/zones")]
        public async Task<IActionResult> GetZonesByScene(int userId)
        {
            var zones = await _db.Zones
                .Where(z => z.UserId == userId)
                .ToListAsync();

            if (zones == null || zones.Count == 0)
                return NotFound($"Scéna s ID {userId} nemá žádné zóny nebo neexistuje.");

            return Ok(zones);
        }
    }

}