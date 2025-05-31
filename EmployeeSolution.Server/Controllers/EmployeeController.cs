
using EmployeeSolution.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeSolution.Server.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeesDbContext _dbcontext;

        public EmployeeController(EmployeesDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var AllEmp = await _dbcontext.Employees.ToListAsync();
            return Ok(AllEmp);

        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetById(int Id)
        {
            var emp = await _dbcontext.Employees.FindAsync(Id);
            if (emp == null)
            {
                return NotFound();
            }
            return Ok(emp);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Employee data)
        {
            if (data == null)
            {
                return BadRequest();
            }
            await _dbcontext.Employees.AddAsync(data);
            await _dbcontext.SaveChangesAsync();
            return Ok(data);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] Employee data,  int id)
        {
            if (data == null)
            {
                return BadRequest();
            }
            var employee = await _dbcontext.Employees.FindAsync(id);
            if(employee == null)
            {
                return NotFound();
            }
            employee.Name = data.Name;
            employee.Email = data.Email;
            employee.Salary = data.Salary;
            employee.Position = data.Position;
            employee.Department = data.Department;
            employee.Status = data.Status;
             _dbcontext.Employees.Update(employee);
            await _dbcontext.SaveChangesAsync();
            return Ok(employee);
        }
    }
}