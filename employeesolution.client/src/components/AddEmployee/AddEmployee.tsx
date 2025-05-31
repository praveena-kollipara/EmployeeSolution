import React, {useState } from "react";
import { IEMP } from "../../Interface";
import axios from "axios";
import "./AddEmployee.css";

const AddEmployee: React.FC = () => {
    const [employee, setEmployee] = useState<IEMP>({
        name: "",
        email: "",
        salary: 0,
        position: "",
        department: "",
        status: "",
        id: 0
    })
    const [record, setRecord] = useState<IEMP[]>([]);
    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setEmployee((prev) => ({
            ...prev,
            [name]: type === "number" ? +value: value
        }))
    }
    const handleSave = () => {
        const newRecord = { ...employee }
        axios.post("https://localhost:7190/api/Employee", newRecord)
        setRecord((prev) => ([
            ...prev, newRecord
        ]))
    }
    return (
        <div className="form-container">
            <h3> Employee Form</h3>
            <div>
                <div className="form-group">
                    <label >Name</label>
                    <input type="text" placeholder="Enter Name" value={employee.name} name="name" onChange={handleInput}  />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" placeholder="Enter Email" value={employee.email} name="email" onChange={handleInput} />
                </div>
                <div className="form-group">
                    <label>Salary</label>
                    <input type="number" value={employee.salary} name="salary" onChange={handleInput} />
                </div>
                <div className="form-group">
                    <label>Position</label>
                    <select value={employee.position} name="position" onChange={handleInput}>
                        <option value="">--Select Option--</option>
                        <option value="QA Engineer">QA Engineer</option>
                        <option value="HR Manager">HR Manager</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Full Stack Developer">Full Stack Developer</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Departmemt</label>
                    <select value={employee.department} name="department" onChange={handleInput}>
                        <option value="">--Select an Option--</option>
                        <option value="Quality Assurance">Quality Assurance</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Engineering">Engineering</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <div>
                        <input type="radio" value="Active" name="status" checked={employee.status === "Active"} onChange={handleInput} />
                        <label>Active</label>
                    </div>
                    <div>
                        <input type="radio" value="InActive" name="status" checked={employee.status === "InActive"} onChange={handleInput} />
                        <label>InActive</label>
                    </div>
                </div>
            </div>
            <button className="button_section" onClick={handleSave}>Save</button>
        </div>
    )
}
export default AddEmployee;