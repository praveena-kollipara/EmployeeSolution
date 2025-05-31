import React from 'react';
import employeeIcon from '../assets/employeeIcon.jpg'
import "./MainHeader.css"
const MainHeader: React.FC=()=> {
    return (
        <div className="MainHeader">
            <img src={employeeIcon} className="MainHeader img" alt="Employee_Icon" />
            <h1 className="header-title">Employee Management System</h1>
        </div>
    )
}
export default MainHeader;