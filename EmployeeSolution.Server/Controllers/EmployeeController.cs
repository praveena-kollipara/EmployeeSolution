
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
            var AllEmp = await _dbcontext.Employees.Select(x=>
                new EmployeeDTO
                {
                    Name = x.Name,
                    Email = x.Email,
                    Salary = x.Salary,
                    Position = x.Position,
                    Department = x.Department,
                    Status = x.Status,
                    EmpId = x.EmpId,
                    Hike=x.Hike,
                    SalaryHike =x.Salary +( x.Salary * (x.Hike/100))
                }
            ). ToListAsync();
            return Ok(AllEmp);
            //salry -> salary in db,hike->hike
            //when calling this get api -> I want salary column to be salary+hike
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
        public async Task<IActionResult> Put([FromBody] Employee data,  string id)
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

        [HttpGet("getbydept/{dept}")]  //- getbydept/dev
           // getbydept?dept=dev&status=active
        public async Task<IActionResult> getbydepartment(string dept)
        {
            var empdepts =await _dbcontext.Employees.Where(emp =>emp.Department == dept).ToListAsync();
            return Ok(empdepts);
        }



    }
}