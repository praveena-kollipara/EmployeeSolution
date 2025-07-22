import React, { useEffect, useState } from "react";
import { IEMP } from "../../Interface"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../index.css"

const MaintainEmployee: React.FC = () => {
    const [data, setData] = useState<IEMP[]>([]);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedEditRecord, setSelectedEditRecord] = useState<IEMP>({
        name: '',
        email: '',
        salary: 0,
        position: '',
        department: '',
        status: '',
        empId: '',
        hike: 0,
        salaryHike: 0
    });
    const [query, setQuery] = useState('');
    const [filteredData, setFilterData] = useState<IEMP[]>([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleUpdateModal = (record: IEMP) => {
        setSelectedEditRecord(record)
        setOpenEditModal(true);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const res = await axios.get('https://localhost:7190/api/Employee');
            setData(res.data);
        }
        catch (err) {
            console.log(err);
        }
        
    }

    const handleEditInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        
        const { name, value } = e.target
        setSelectedEditRecord((prev) => (
            { ...prev, [name]: value }
        ))
        console.log(selectedEditRecord);
    }
    const handleSearch = () => {
        setFilterData(
            data.filter((item) => (
                item.name.toLowerCase() === query.toLowerCase() ||
                item.department.toLowerCase() === query.toLowerCase() ||
                item.position.toLowerCase() === query.toLowerCase() ||
                item.status.toLowerCase() === query.toLowerCase()
        )
        ))    
    }
    const AddNewRecord = async () => {
        const id = selectedEditRecord.empId;
        try {
            const response = await axios.put(`https://localhost:7190/api/Employee/${id}`, selectedEditRecord);
            const updatedEmployee = response.data;
            setSelectedEditRecord(updatedEmployee);
            setData((prev) => (
                prev.map((emp)=> (
                    emp.empId === updatedEmployee.empId ? updatedEmployee : emp
                ))
            ));
            setSelectedEditRecord({
                name: '',
                email: '',
                salary: 0,
                position: '',
                department: '',
                status: '',
                empId: '',
                hike: 0,
                salaryHike: 0
            })
            setOpenEditModal(false);
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleDelete = (id: string) => {
        setOpenDeleteModal(true);
    }
    return (
        <div>
            <h3 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>Edit/Delete Employee </h3>
            <section>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="search..." />
                <button onClick={handleSearch}>Search</button>

            </section>
            <table className="table_section">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Hike%</th>
                        <th>NewSalary</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {((filteredData.length > 0) ? filteredData : data).map((emp) => (
                        <tr key={emp.empId}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.salary}</td>
                            <td>{emp.hike}</td>
                            <td>{emp.salaryHike}</td>
                            <td>{emp.position}</td>
                            <td>{emp.department}</td>
                            <td>{emp.status}</td>
                            <td>
                                <FontAwesomeIcon onClick={() => { handleUpdateModal(emp) }} icon={faEdit} style={{ marginRight: "10px" }} />
                                <FontAwesomeIcon onClick={() => { handleDelete(emp.empId) }} icon={faTrash} />
                            </td>
                        </tr>
                    
                    ))}
                </tbody>
            </table>
            {openEditModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <h3>Edit Employee</h3>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={selectedEditRecord.name}
                                onChange={handleEditInput}
                            />
                        </div>
                        <div className="form-group">
                            <label>Salary</label>
                            <input
                                type="number"
                                name="salary"
                                value={selectedEditRecord.salary}
                                onChange={handleEditInput}
                            />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Active"
                                        checked={selectedEditRecord.status === "Active"}
                                        onChange={handleEditInput}
                                    />
                                    Active
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="InActive"
                                        checked={selectedEditRecord.status === "InActive"}
                                        onChange={handleEditInput}
                                    />
                                    InActive
                                </label>
                            </div>
                        </div>
                        <div className="button_container">
                            <button className="button_section" onClick={AddNewRecord } >Save</button>
                            <button className="button_section" onClick={() => setOpenEditModal(false)}>Cancel</button>
                        </div>
                    </div>

                </div>
            )}
            {openDeleteModal && (
                <div>
                    <p>Are you sure want to delete this record</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <button>Yes</button>
                        <button>No</button>
                    </div>
                </div>
            ) }

        </div>
    );
}
export default MaintainEmployee