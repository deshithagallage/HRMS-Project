import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useParams,NavLink, Outlet } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './styles/EmployeeManagement.css'; // Import the CSS file
import NavBar from './Navbar';


function handleLogout() {
  // Remove the token from local storage
  localStorage.removeItem("token");
}

function EmployeeManagement() {
  const { id_to_transfer } = useParams();
  const navigate = useNavigate();

  localStorage.removeItem('employeeData');
  localStorage.removeItem('haveDependent');

  const handleAddEmployee = () => {
    navigate(`/PageHR/${id_to_transfer}/EmployeeManagement/AddEmployee`);
  };

  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const perPage = 10; // Number of records per page

  useEffect(() => {
    Axios.get('http://localhost:3000/employeeData')
      .then((response) => setEmployees(response.data))
      .catch((error) => console.log(error));
  }, []);

  

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const customButtonLabel = (label) => {
    return (
      <button className="custom-pagination-button">
        {label}
      </button>
    );
  };

  // Filter employees based on search input
  const filteredEmployees = employees.filter((employee) =>
    employee.First_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.Last_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.Job_Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.Employee_ID.includes(searchTerm)
  );

  const pageCount = Math.ceil(filteredEmployees.length / perPage);
  const offset = currentPage * perPage;

  const displayedEmployees = filteredEmployees.slice(offset, offset + perPage);

  useEffect(() => {
    // Check user authentication using Axios
    Axios.get("http://localhost:3000/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.data.userID === id_to_transfer && response.data.jobTitle === 'HR Manager') {
        } else {
          navigate(`/`);
        }
      })
      .catch((error) => {
        console.error(error);
        navigate(`/`);
      });
  }, [id_to_transfer, navigate]);

  return (

    <div className="page-container">
       <div className="sidebar">
      <div style={{ marginTop: '20px',marginBottom:'40px',display: 'flex',alignItems: 'center',textAlign: 'center' }}>
        <h2>Jupiter Apparels</h2></div>
        <ul>
        <li>
            <NavLink to={`/PageHR/${id_to_transfer}/`} >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={`/PageHR/${id_to_transfer}/EmployeeManagement`}>
              Employee Management
            </NavLink>
          </li>
          <li>
            <NavLink to={`/PageHR/${id_to_transfer}/AddCustom/`} >
              Add Custom Attribute
            </NavLink>
          </li>
          <li>
            <NavLink to={`/PageHR/${id_to_transfer}/ReportGenaration/`}>
              Report Generation
            </NavLink>
          </li>
          <li>
            <NavLink to={`/`} activeClassName="active-link" onClick={handleLogout}>
              Log out
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="content">
      <NavBar text="Employee Management"/>      

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-success my-3" style={{ margin: '30px' }} onClick={handleAddEmployee}>
            Add New Employee
          </button>
        
          <div className="search-bar">
            <input
              type="text"
              id="search-bar"
              placeholder="Search employees"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="table-container" >
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Job Title</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedEmployees.map((employee) => (
                <tr key={employee.Employee_ID}>
                  <td>{employee.Employee_ID}</td>
                  <td>{employee.First_Name + " " + employee.Last_Name}</td>
                  <td>{employee.Gender}</td>
                  <td>{employee.Job_Title}</td>
                  <td>{employee.Email}</td>
                  <td>
                    <div style={{margin: "0px"}} className="d-flex custom-button-container">
                      <div style={{margin: "0px"}} className="mx-1">
                        <button type="button" className="btn btn-success" onClick={
                          () => {
                            const id_to_view = employee.Employee_ID;
                            navigate(`/PageHR/${id_to_transfer}/EmployeeManagement/ViewEmployee/${id_to_view}`)
                          }
                        }>
                          View
                        </button>
                      </div>
                      <div style={{margin: "0px"}} className="mx-1">
                        <button type="button" className="btn btn-warning" onClick={
                          () => {
                            const id_to_edit = employee.Employee_ID;
                            navigate(`/PageHR/${id_to_transfer}/EmployeeManagement/EditEmployee/${id_to_edit}`)
                          }
                        }>
                          Edit
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          
        <div className="pagination-container">
          <ReactPaginate
            previousLabel={customButtonLabel('Previous')}
            nextLabel={customButtonLabel('Next')}
            breakLabel={<span>...</span>}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </div>
      </div>
    </div>
  );
}

export default EmployeeManagement;
