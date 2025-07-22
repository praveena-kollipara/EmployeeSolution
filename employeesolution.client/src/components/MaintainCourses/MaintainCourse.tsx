
import React, { useState, useEffect } from 'react'
import { ICourses } from '../../Interface'
import axios from 'axios'
import '../../App.css'

const MaintainCourse = () => {
    const [courseData, setCourseData] = useState<ICourses[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCourseinfo, setNewCourseInfo] = useState<ICourses>({
        courseId: '',
        courseName: '',
        coursesStatus: '',
        startdate: '',
        enddate: ''
    })
    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:7190/Course');
            setCourseData(response.data);
        }
        catch (err) {
            console.log(err);

        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCourseInfo((prev) => (
            { ...prev, [name]: value }
        ))
    }
    const SaveNewCourse = async () => {
        try {
            const response = await axios.post('https://localhost:7190/Course', newCourseinfo);
            setNewCourseInfo(response.data);
            setCourseData((prev) => [...prev, newCourseinfo]);
            setNewCourseInfo({
                courseId: '',
                courseName: '',
                coursesStatus: '',
                startdate: '',
                enddate: ''
            })
            setIsAddModalOpen(false);
        }
        catch (err) {
            console.log(err);
        }
    }
  return (
      <div>
          <h1 style={{ textAlign: "center" }}>Course Details</h1>
          <button className="button_section" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
              onClick={() => setIsAddModalOpen(true)}>Add New Course</button>
          <table className="table_section">
              <thead>
                  <tr>
                      <th>CourseId</th>
                      <th>CourseName</th>
                      <th>CourseStatus</th>
                      <th>StartDate</th>
                      <th>EndDate</th>
                  </tr>
              </thead>
              <tbody>
                  {courseData.map((item) => (
                      <tr key={item.courseId}>
                          <td>{item.courseId}</td>
                          <td>{item.courseName}</td>
                          <td>{item.coursesStatus}</td>
                          <td>{item.startdate}</td>
                          <td>{item.enddate}</td>
                      </tr>
                  ))}    
              </tbody>
          </table>

          {/* Add Modal*/}

          {isAddModalOpen && (
              <div>
                  <div>
                      <label>CourseID</label>
                      <input type="text" name="courseId" value={newCourseinfo.courseId} onChange={handleChange} />
                  </div>
                  <div>
                      <label>CourseNamw</label>
                      <input type="text" name="courseName" value={newCourseinfo.courseName} onChange={handleChange} />
                  </div>
                  <div>
                      <label>StartDate</label>
                      <input type="date" name="startdate" value={newCourseinfo.startdate} onChange={handleChange} />
                  </div>
                  <div>
                      <label>EndDate</label>
                      <input type="date" name="enddate" value={newCourseinfo.enddate} onChange={handleChange} />
                  </div>
                  <div>
                      <label>courseStatus</label>
                      <input type="text" name="coursesStatus" value={newCourseinfo.coursesStatus} onChange={handleChange} />
                  </div>
                  <button onClick={SaveNewCourse}>Save</button>
                  <button onClick={() => setIsAddModalOpen(false)}>Cancel</button>
              </div>
          )}
      </div>
     
  );
}

export default MaintainCourse;