using EmployeeSolution.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeSolution.Server.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class EmployeeCourseController : Controller
    {
        private readonly EmployeesDbContext _context;
        public EmployeeCourseController(EmployeesDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var records = await _context.EmployeeCourses.ToListAsync();
            return Ok(records);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EmployeeCourse item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _context.EmployeeCourses.AddAsync(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }
    }
}
