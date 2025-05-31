using System;
using System.Collections.Generic;

namespace EmployeeSolution.Server.Models;

public partial class Employee
{
    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public decimal Salary { get; set; }

    public string? Position { get; set; }

    public string? Department { get; set; }

    public string? Status { get; set; }

    public int EmpId { get; set; }
}
