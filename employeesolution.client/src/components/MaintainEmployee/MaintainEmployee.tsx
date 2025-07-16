import React, { useEffect, useState } from "react";
import { IEMP } from "../../Interface"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../index.css"

const MaintainEmployee: React.FC = () => {
    const [data, setData] = useState<IEMP[]>([]);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedEditRecord, setSelectedEditRecord] = useState<IEMP | null>(null);
    const [query, setQuery] = useState('');
    const [filteredData, setFilterData] = useState<IEMP[]>([]);

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
        if (!selectedEditRecord)
            return;
        const { name, value } = e.target
        setSelectedEditRecord((prev) => (
            { ...prev!, [name]: value }
        ))
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
                                <FontAwesomeIcon icon={faTrash} />
                            </td>
                        </tr>
                    
                    ))}
                </tbody>
            </table>
            {openEditModal && selectedEditRecord && (
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
                            <button className="button_section">Save</button>
                            <button className="button_section" onClick={() => setOpenEditModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
export default MaintainEmployee