using System;
using System.Collections.Generic;

namespace EmployeeSolution.Server.Models;

public partial class Performance
{
    public Guid PerformanceId { get; set; }

    public int Rating { get; set; }

    public string? Feedback { get; set; }
}
