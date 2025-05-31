import React, { useEffect, useState } from "react";
import { IEMP } from "../Interface"
import axios from "axios";
import "../App.css"

const EmployeeInfo: React.FC = () => {
    const [employees, setEmployees] = useState<IEMP[]>([]);
    const [isOnlyActive, setIsOnlyActive] = useState<boolean>(false);
    const handleFilterEmp = () => {
        
        setIsOnlyActive(!isOnlyActive);
    }
    const FilterEmp = employees.filter((emp) => (emp.status === "Active"));
    useEffect(() => {
        axios.get('https://localhost:7190/api/Employee')
            .then(res => setEmployees(res.data))
            .catch(err => console.log(err))
    },[])
    return (
        <div>
            <button className='button_section' style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
                onClick={handleFilterEmp}>{isOnlyActive ? "ActiveEmployees" : "AllEmployees"}</button>
            <table className="table_section">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {(isOnlyActive? employees: FilterEmp) .map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.position}</td>
                            <td>{emp.department}</td>
                            <td>{emp.salary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default EmployeeInfo;