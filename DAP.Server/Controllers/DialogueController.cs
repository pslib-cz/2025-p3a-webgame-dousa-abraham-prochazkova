using DAP.Server.Models;
using DAP.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace DAP.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DialogueController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DialogueController(ApplicationDbContext context)
        {
            _context = context;
        }

    [HttpGet("{id}")]
    public async Task<ActionResult<int>> GetId(int id)
    {
        var product = await _context.Dialogues
        .Where(p => p.DialogueId == id)
        .Select(p => p.DialogueId)
        .FirstOrDefaultAsync();

        if (product == 0) return NotFound();
        return product;
    }
    }
}
