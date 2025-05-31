using System;
using System.Collections.Generic;

namespace EmployeeSolution.Server.Models;

public partial class Course
{
    public string CourseId { get; set; } = null!;

    public string? CourseName { get; set; }

    public string? CoursesStatus { get; set; }

    public DateOnly? Startdate { get; set; }

    public DateOnly? Enddate { get; set; }
}
