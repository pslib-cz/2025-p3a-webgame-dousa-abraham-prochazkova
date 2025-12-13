using DAP.Server.Models;
using DAP.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace DAP.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ItemController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<int>> GetId(int id)
        {
            var product = await _context.Items
                                        .Where(p => p.ItemId == id)
                                        .Select(p => p.ItemId)
                                        .FirstOrDefaultAsync();

            if (product == 0) return NotFound();
            return product;
        }
    }
}