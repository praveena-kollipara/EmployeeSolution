import React, { useEffect, useState } from "react";
import { ICourses } from "../Interface"
import '../App'
import axios from 'axios'

interface Props {
    EmpId : string
}

const EmployeeCourses: React.FC<Props> = ({ EmpId }) => {
    const [courseInfo, setCourseInfo] = useState<ICourses[]>([]);
    const fetchCourses = async () => {
        try {
            const res = await axios.get(`https://localhost:7190/EmployeeCourse/getbyemid/courses/empid?empid=${EmpId}`);
            setCourseInfo(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchCourses();
    },[])
    
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>CourseId</th>
                        <th>CourseName</th>
                        <th>StartDate</th>
                        <th>EndDate</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {courseInfo.map((item) => (
                        <tr key={item.courseId} >
                            <td>{item.courseId}</td>
                            <td>{item.startdate}</td>
                            <td>{item.enddate}</td>
                            <td>{item.coursesStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>   
        </div>
    );
}
export default EmployeeCourses;