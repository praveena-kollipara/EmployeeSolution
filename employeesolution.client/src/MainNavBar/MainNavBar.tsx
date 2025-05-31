import { NavLink } from 'react-router-dom';
import '../MainNavBar/MainNavBar.css';


const MainNavBar: React.FC = () => {
   
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/Home" className={({ isActive }) => isActive ? "active-link" : undefined}>
                        Home
                    </NavLink>
                </li>
                
                  
                <li>
                   <NavLink to="/AddEmployee" className={({ isActive }) => isActive ? "active-link" : undefined}>
                                    Add Employee</NavLink>
                </li>
                <li>
                    <NavLink to="/UpdateEmployee" className={({ isActive }) => isActive ? "active-link" : undefined}>
                        Update Employee</NavLink>
                </li>
                       
            </ul>
        </nav>
    );
};

export default MainNavBar;
