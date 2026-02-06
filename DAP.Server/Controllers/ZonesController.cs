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

		[HttpGet("scene/{sceneId}/zones")]
		public async Task<IActionResult> GetZones(int sceneId)
		{
			var zones = await _db.Zones
				.Include(z => z.Item)
				.Include(z => z.ItemDown)
				.Where(z => z.UserId == sceneId)
				.ToListAsync();

			return Ok(zones);
		}
    }

}