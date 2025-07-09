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

        [HttpGet("getbyemid/courses/empid")]
        public async Task<IActionResult> GetById ([FromQuery] string empid)
        {
            var empcourses = await _context.EmployeeCourses.Where(x => x.EmpId == empid).Select(x => x.CourseId).ToListAsync();
            var courseinfo = await _context.Courses.Where(x => empcourses.Contains(x.CourseId)).ToListAsync();
            return Ok(courseinfo);

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

        [HttpPut("{id}")]
        public async Task<IActionResult> put([FromBody] EmployeeCourse item, int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var record = await _context.EmployeeCourses.FindAsync(id);
            if (record == null)
            {
                return NotFound();
            }
            record.CourseName = item.CourseName;
            record.CourseId = item.CourseId;
            record.CourseStatus = item.CourseStatus;
            _context.EmployeeCourses.Update(record);
            await _context.SaveChangesAsync();
            return Ok(record);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var record = await _context.EmployeeCourses.FindAsync(id);
            if (record == null)
            {
                return NotFound();
            }
            _context.EmployeeCourses.Remove(record);
            await _context.SaveChangesAsync();
            return Ok(record);
        }
    }
}
