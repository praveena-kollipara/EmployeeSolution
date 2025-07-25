import EmployeeInfo from './components/EmployeeInfo'
import './App.css';
import { Routes, Route } from 'react-router-dom'
import MainNavBar from "./MainNavBar/MainNavBar"
import MainHeader from './MainHeader/MainHeader';
import AddEmployee from './components/AddEmployee/AddEmployee';
import MaintainEmployee from './components/MaintainEmployee/MaintainEmployee';
import MaintainCourse from './components/MaintainCourses/MaintainCourse';




function App() {
   
    return (
        <div>
            
            <MainHeader />
            <MainNavBar />
            <Routes>
                <Route path="/Home" element={<EmployeeInfo  />} />
                <Route path="/AddEmployee" element={<AddEmployee />} />
                <Route path="/UpdateEmployee" element={<MaintainEmployee />} />
                <Route path="MaintainCourse" element={<MaintainCourse/> }/>
            </Routes>
            
        </div>
    );
}

export default App;