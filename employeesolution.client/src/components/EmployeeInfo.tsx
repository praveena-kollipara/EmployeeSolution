import React, { useEffect, useState } from "react";
import { IEMP } from "../Interface"
import axios from "axios";
import "../App.css"

const EmployeeInfo: React.FC = () => {
    const [allemployees, setAllEmployees] = useState<IEMP[]>([]);
    const [employees, setEmployees] = useState<IEMP[]>([]);
    const [isOnlyActive, setIsOnlyActive] = useState<boolean>(false);
    const [selectedDept, setSelectedDept] = useState('');
    const handleFilterEmp = () => {
        
        setIsOnlyActive(!isOnlyActive);
    }
    const FilterEmp = employees.filter((emp) => (emp.status === "Active"));
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:7190/api/Employee');
            setAllEmployees(response.data);
            setEmployees(response.data); //employee-all employee data
        }
        catch (err) {
            console.log(err);
        }
    }
    //const fetchDeptData = async (dept: string) => {
    //    try {
    //        const response = await axios.get(`https://localhost:7190/api/Employee/getbydept/${dept}`);
    //        setEmployees(response.data);
    //    }
    //    catch (err) {
    //        console.log(err);
    //    }
    //}

    const handleDeptInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const dept = e.target.value;
        setSelectedDept(dept);
        const depts = allemployees.filter((emp) => emp.department === dept);
        setEmployees(depts); //only QA

        //if (dept) {
        //    fetchDeptData(dept);
        //}
        //else {
        //    fetchData();
        //}
    }
    //const getMyName(string myName) {
    //    print(myName)
    //};

    //var name = "praveena";
    //getMyName(name);


    return (
        <div>
            <button className='button_section' style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
                onClick={handleFilterEmp}>{isOnlyActive ? "ActiveEmployees" : "AllEmployees"}</button>
            <select name="dept" value={selectedDept} onChange={handleDeptInput}>
                <option value="">Select</option>
                <option value="Quality Assurance">Quality Assurance</option>
                <option value="Engineering">Engineering</option>
                <option value="Human Resources">Human Resources</option>
            </select>
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
                    {(isOnlyActive ? employees : FilterEmp).map((emp) => (
                        <tr key={emp.id} >
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