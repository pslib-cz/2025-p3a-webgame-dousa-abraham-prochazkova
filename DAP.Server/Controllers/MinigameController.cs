using DAP.Server.Models;
using DAP.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace DAP.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MinigameController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MinigameController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<int>> GetId(int id)
        {
            var product = await _context.Minigames
                                        .Where(p => p.MinigameId == id)
                                        .Select(p => p.MinigameId)
                                        .FirstOrDefaultAsync();

            if (product == 0) return NotFound();
            return product;
        }
    }
}