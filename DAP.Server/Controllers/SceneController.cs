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
    }

}