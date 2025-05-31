using System;
using System.Collections.Generic;

namespace EmployeeSolution.Server.Models;

public partial class EmployeeCourse
{
    public int EmpId { get; set; }

    public string CourseId { get; set; } = null!;

    public string? CourseName { get; set; }

    public string? CourseStatus { get; set; }
}
