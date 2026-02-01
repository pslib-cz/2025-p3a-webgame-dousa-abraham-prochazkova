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

		[HttpGet("{zoneId}")]
		public async Task<IActionResult> GetCurrentZone(int zoneId)
		{
			var zone = await _db.Zones
				.FirstOrDefaultAsync(z => z.ZoneId == zoneId);

			if (zone == null)
			{
				return NotFound(new { message = $"Zóna s ID {zoneId} nebyla nalezena." });
			}

			return Ok(zone);
		}
    }

}