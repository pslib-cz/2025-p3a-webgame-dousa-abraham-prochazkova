using DAP.Server.Models;
using DAP.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DAP.Server.Controllers
{
	[ApiController]
	[Route("api/zones")]
	public class ZonesController : ControllerBase
	{
		private readonly ApplicationDbContext _db;

		public ZonesController(ApplicationDbContext db)
		{
			_db = db;
		}

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetZonesByScene(int userId)
        {
            var zones = await _db.Zones
                .Include(z => z.Item)
                .Include(z => z.ItemDown)
                .Where(z => z.UserId == userId)
                .OrderBy(z => z.ZoneId)
                .ToListAsync();

            return Ok(zones);
        }
    }

}