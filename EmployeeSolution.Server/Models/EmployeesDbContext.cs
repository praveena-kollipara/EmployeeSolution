using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace EmployeeSolution.Server.Models;

public partial class EmployeesDbContext : DbContext
{
    public EmployeesDbContext()
    {
    }

    public EmployeesDbContext(DbContextOptions<EmployeesDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<EmployeeCourse> EmployeeCourses { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=PRAVEENA;Database=EmployeesDB;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Course>(entity =>
        {
            entity.Property(e => e.CourseId)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("courseId");
            entity.Property(e => e.CourseName)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("courseName");
            entity.Property(e => e.CoursesStatus)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("coursesStatus");
            entity.Property(e => e.Enddate).HasColumnName("enddate");
            entity.Property(e => e.Startdate).HasColumnName("startdate");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmpId).HasName("PK_Employees_1");

            entity.Property(e => e.Department)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Position)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Salary).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<EmployeeCourse>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("employeeCourses");

            entity.Property(e => e.CourseId)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("courseId");
            entity.Property(e => e.CourseName)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("courseName");
            entity.Property(e => e.CourseStatus)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("courseStatus");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
