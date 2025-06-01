using System;
using System.Collections.Generic;

namespace EmployeeSolution.Server.Models;

public partial class EmployeeCourse
{
    public string CourseId { get; set; } = null!;

    public string? CourseName { get; set; }

    public string? CourseStatus { get; set; }

    public string? EmpId { get; set; }

    public int Id { get; set; }
}
