using DAP.Server.Models;
using DAP.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace DAP.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SceneController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SceneController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<int>> GetId(int id)
        {
            var product = await _context.Scenes
                                        .Where(p => p.RoomId == id)
                                        .Select(p => p.RoomId)
                                        .FirstOrDefaultAsync();

            if (product == 0) return NotFound();
            return product;
        }
    }
}