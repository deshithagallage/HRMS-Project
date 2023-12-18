import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Axios from 'axios';

import Login from './Login';
import PageEMP from './PageEMP';
import PageHR from './PageHR';
import LeaveReq from './LeaveReq';
import PasswordChange from './PasswordChange';
import Supervisor from './Supervisor';
import EmployeeManagement from './EmployeeManagement';
import AddEmployee from './AddEmployee';
import AddCustom from './AddCustom';
import AddDependent from './AddDependent';
import ReportGenaration from './Report';
import Report1 from './Report1';
import Report2 from './Report2';
import Report3 from './Report3';
import Report4 from './Report4';
import Report5 from './Report5';
import PageAdmin from './PageAdmin';
import AddHR from './AddHR';
import AddDependentHR from './AddDependentHR';
import ViewEmployee from './ViewEmployee';
import EditEmployee from './EditEmployee';
import ViewHR from './ViewHR';
import EditHR from './EditHR';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check user authentication using Axios
    Axios.get("http://localhost:3000/authenticate/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => {
        setAuthenticated(true); // Set authentication status to true if the request is successful
      })
      .catch((error) => {
        console.error(error);
        setAuthenticated(false); // Set authentication status to false if the request fails
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/PageAdmin" element={<PageAdmin />} />
        <Route path="/PageAdmin/AddHR" element={<AddHR />} />
        <Route path="/PageAdmin/AddHR/AddDependent" element={<AddDependentHR />} />
        <Route path="/PageAdmin/ViewHR/:id_to_view" element={<ViewHR />} />
        <Route path="/PageAdmin/EditHR/:id_to_edit" element={<EditHR />} />

        <Route path="/PageHR/:id_to_transfer" element={<PageHR />} />
        <Route path="/PageHR/:id_to_transfer/EmployeeManagement" element={<EmployeeManagement />} />
        <Route path="/PageHR/:id_to_transfer/EmployeeManagement/AddEmployee" element={<AddEmployee />} />
        <Route path="/PageHR/:id_to_transfer/EmployeeManagement/AddEmployee/AddDependent" element={<AddDependent />} />
        <Route path="/PageHR/:id_to_transfer/EmployeeManagement/ViewEmployee/:id_to_view" element={<ViewEmployee />} />
        <Route path="/PageHR/:id_to_transfer/EmployeeManagement/EditEmployee/:id_to_edit" element={<EditEmployee />} />
        <Route path="/PageHR/:id_to_transfer/AddCustom" element={<AddCustom />} />

        <Route path="/PageEMP/:id_to_transfer" element={<PageEMP />} />
        <Route path="/PageEMP/:id_to_transfer/LeaveReq" element={<LeaveReq />} />
        <Route path="/PageEMP/:id_to_transfer/PasswordChange" element={<PasswordChange />} />
        <Route path="/PageEMP/:id_to_transfer/Supervisor" element={<Supervisor />} />
        
        <Route path="/PageHR/:id_to_transfer/ReportGenaration" element={<ReportGenaration />} />
        <Route path="/PageHR/:id_to_transfer/ReportGenaration/Report1" element={<Report1 />} />
        <Route path="/PageHR/:id_to_transfer/ReportGenaration/Report2" element={<Report2 />} />
        <Route path="/PageHR/:id_to_transfer/ReportGenaration/Report3" element={<Report3 />} />
        <Route path="/PageHR/:id_to_transfer/ReportGenaration/Report4" element={<Report4 />} />
        <Route path="/PageHR/:id_to_transfer/ReportGenaration/Report5" element={<Report5 />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
