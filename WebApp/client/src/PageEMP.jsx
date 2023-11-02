import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import EmployeeCard from './Components/EmployeeCard.jsx';
import './styles/PageEMP.css'; // Import the CSS file (assuming the CSS file name is PageEMP.css)
import { NavLink } from 'react-router-dom';
import NavBar from './Navbar';

function PageEMP() {
  const { id_to_transfer } = useParams();
  console.log('id_to_transfer in PageEMP:', id_to_transfer);
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState([]); // State to store employee data
  const [contactNumbers, setContactNumbers] = useState([]); // State to store contact numbers
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3000/employeeDetailForHR/${id_to_transfer}`)
      .then((response) => {
        setEmployeeData(response.data.employee);
        setContactNumbers(response.data.contact);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });

    Axios.get(`http://localhost:3000/fetchSupervisors/${id_to_transfer}`)
      .then((response) => {
        setSupervisors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching supervisor data:', error);
      });
  }, [id_to_transfer]);

  console.log('employeeData:', employeeData);
  console.log('supervisors:', supervisors);

  const handleLeaveRequestClick_1 = () => {
    navigate(`/PageEMP/${id_to_transfer}/LeaveReq`);
  };

  const handleLeaveRequestClick_2 = () => {
    navigate(`/PageEMP/${id_to_transfer}/PasswordChange`);
  };

  const handleLeaveRequestClick_3 = () => {
    if (supervisors.some(supervisor => supervisor.Supervisor_ID === id_to_transfer)) {
      navigate(`/PageEMP/${id_to_transfer}/Supervisor?id_to_transfer=${id_to_transfer}`);
    }
  };

  const handleSidebarLinkClick = (path) => {
    // Check the condition before navigating to the "Supervisor Access" page
    if (path === `/PageEMP/${id_to_transfer}/Supervisor?id_to_transfer=${id_to_transfer}`) {
      if (supervisors.some(supervisor => supervisor.Supervisor_ID === id_to_transfer)) {
        navigate(path);
      } else {
        console.log('You do not have supervisor access');
      }
    } else {
      navigate(path);
    }
  };

  return ( 
   
      
    <div className="page-container">                   
      <div className="sidebar">
        <div style={{ marginTop: '20px', marginBottom: '40px', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <h2>Jupiter Apparels</h2>
        </div>
        <ul>
          <li>
            <NavLink to={`/PageEMP/${id_to_transfer}`} activeClassName="active-link">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={`/PageEMP/${id_to_transfer}/LeaveReq`} activeClassName="active-link">
              Leave Request
            </NavLink>
          </li>
          <li>
            <NavLink to={`/PageEMP/${id_to_transfer}/PasswordChange`} activeClassName="active-link">
              Reset Password
            </NavLink>
          </li>
          <li>
            <NavLink to={`/`} activeClassName="active-link">
              Log out
            </NavLink>
          </li>
          <li>
            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                className="btn btn-primary btn-lg custom-button"
                onClick={handleLeaveRequestClick_3}
                disabled={!supervisors.some(supervisor => supervisor.Supervisor_ID === id_to_transfer)}
              >
                Supervisor Access
              </button>
            </div>
          </li>
        </ul>
      </div>                           
      <div className="container narrow-container d-flex flex-column align-items-center">      
        <div style={{ marginBottom: '20px' }}>
          <EmployeeCard employee={employeeData} contactNumbers={contactNumbers} supervisors={supervisors}/>
        </div>
      </div>
      </div>          
  );
}

export default PageEMP;
