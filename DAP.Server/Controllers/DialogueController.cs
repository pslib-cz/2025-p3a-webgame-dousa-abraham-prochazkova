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
            // var product = await _context.Dialogues
            // .Where(p => p.DialogueId == id)
            // .Select(p => p.DialogueId)
            // .FirstOrDefaultAsync();
            // 
            // if (product == 0) return NotFound();
            // return product;
            var dialogue = new Dialogue
            {
                DialogueId = 0,
                DialogueText = "spatne id sceny"
            };
            if (id == 1)
            {
                dialogue = new Dialogue
                {
                    DialogueId = 1,
                    DialogueText = "Vem z popelnice drát a pomocí něj vytáhni klíč z kanálu."
                };
            }
            else if (id == 2)
            {
                dialogue = new Dialogue
                {
                    DialogueId = 2,
                    DialogueText = "Najdi pojistku a vem si papír s nastavením pák."
                };
            }
            else if (id == 3)
            {
                dialogue = new Dialogue
                {
                    DialogueId = 3,
                    DialogueText = "Vem si hrníček, kartu z akvárka, klíč z globusu, heslo z šuplíku."
                };
            }
            else if (id == 4)
            {
                dialogue = new Dialogue
                {
                    DialogueId = 4,
                    DialogueText = "Vodu do generátoru, nastav páky, otevři trezor kartou."
                };
            }
            else if (id == 5)
            {
                dialogue = new Dialogue
                {
                    DialogueId = 5,
                    DialogueText = "Jdeš pozdě, starosta umřel."
                };
            }

            return Ok(dialogue);
        }
    }

    public class Dialogue
    {
        public int DialogueId { get; set; }
        public string DialogueText { get; set; } = "";
    }
}
