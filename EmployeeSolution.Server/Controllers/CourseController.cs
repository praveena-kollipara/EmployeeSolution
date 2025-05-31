using EmployeeSolution.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeSolution.Server.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class CourseController : Controller
    {
        private readonly EmployeesDbContext _context;

        public CourseController (EmployeesDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var AllCourses = await _context.Courses.ToListAsync();
            return Ok(AllCourses);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Course item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _context.Courses.AddAsync(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] Course item, string id)
        {
            if (!ModelState.IsValid) { 
                return BadRequest(ModelState);
            }
            var record = await _context.Courses.FindAsync(id);
            if (record == null)
            {
                return NotFound();
            }
            record.CourseId = item.CourseId;
            record.CourseName = item.CourseName;
            record.CoursesStatus = item.CoursesStatus;
            record.Startdate = item.Startdate;
            record.Enddate = item.Enddate;
            _context.Courses.Update(record);
            await _context.SaveChangesAsync();
            return Ok(record);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {

            var record = await _context.Courses.FindAsync(id);
            if (record == null)
            {
                return NotFound();

            }
            _context.Courses.Remove(record);
            await _context.SaveChangesAsync();
            return Ok(record);
        }
    }
}
