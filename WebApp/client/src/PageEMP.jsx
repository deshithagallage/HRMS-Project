import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import EmployeeCard from './Components/EmployeeCard.jsx';
import './styles/PageHR.css'; // Import the CSS file
import { NavLink } from 'react-router-dom';
import NavBar from './Navbar';

function handleLogout() {
  // Remove the token from local storage
  localStorage.removeItem("token");
}

function PageEMP() {
  const { id_to_transfer } = useParams();
  console.log('id_to_transfer in PageEMP:', id_to_transfer);
  const navigate = useNavigate();

  const [employee, setEmployee] = useState([]);
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    // Check user authentication using Axios
    Axios.get("http://localhost:3000/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (
          response.data.userID === id_to_transfer &&
          (response.data.jobTitle === 'Software Engineer' ||
          response.data.jobTitle === 'QA Engineer' ||
          response.data.jobTitle === 'Accountant')
        ) {} 
        else {
          navigate(`/`);
        }
      })
      .catch((error) => {
        console.error(error);
        navigate(`/`);
      });
  }, [id_to_transfer, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('id_to_transfer in PageEMP:', id_to_transfer);

        const [employeeResponse, supervisorsResponse] = await Promise.all([
          Axios.get(`http://localhost:3000/emp_view/${id_to_transfer}`),
          Axios.get(`http://localhost:3000/fetchSupervisors`)
        ]);

        setEmployee(employeeResponse.data);
        console.log('employee:', employeeResponse.data);
        setSupervisors(supervisorsResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id_to_transfer]);

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
            <NavLink exact to={`/PageEMP/${id_to_transfer}`} >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={`/PageEMP/${id_to_transfer}/LeaveReq`} >
              Leave Request
            </NavLink>
          </li>
          <li>
            <NavLink to={`/PageEMP/${id_to_transfer}/PasswordChange`}>
              Reset Password
            </NavLink>
          </li>
          <li>
            <NavLink to={`/`} activeClassName="active-link" onClick={handleLogout}>
              Log out
            </NavLink>
          </li>
          <li>
            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                className="btn btn-secondary custom-button"
                onClick={handleLeaveRequestClick_3}
                disabled={!supervisors.some(supervisor => supervisor.Supervisor_ID === id_to_transfer)}
              >
                <b>Supervisor Access</b>
              </button>
            </div>
          </li>
        </ul>
      </div>                     
      <div className="container narrow-container d-flex flex-column align-items-center">      
        <div style={{ marginBottom: '20px' }}>
          <EmployeeCard employee={employee} />
        </div>
      </div>
      </div>     
  );
}

export default PageEMP;
