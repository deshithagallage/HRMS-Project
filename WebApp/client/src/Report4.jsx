import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import './styles/Report4.css'; // Import the CSS file
import NavBar from './Navbar';

function formatSalary(salary) {
  // Use Intl.NumberFormat to format the salary
  const salaryFormatter = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR', // You can change the currency code if needed
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return salaryFormatter.format(salary);
}

function Report4() {
  const { id_to_transfer } = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(100000);

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

  useEffect(() => {
    Axios.get(`http://localhost:3000/report4/employeesalaries/${minSalary}/${maxSalary}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [minSalary, maxSalary]);

  return (
    <div>
      <NavBar text="Employee Salary Analysis" width="59%"/>
      <div className="table-container">
        <div className="get-salary d-flex justify-content-start" style={{marginTop: "20px"}}>
          <div >
            <label htmlFor='inputMinSalary' className="ml-2 salary-label" style={{ marginRight: '5px' }}>Min Salary: </label>
            <input id='inputMinSalary' type="number" value={minSalary} placeholder='Minimum Salary' onChange={(e) => setMinSalary(e.target.value ? e.target.value : 0)} style={{ marginRight: '20px' }} />
          </div>
          <div >
            <label htmlFor='inputMaxSalary' className="ml-2 salary-label" style={{ marginRight: '5px' }}>Max Salary: </label>
            <input id='inputMaxSalary' type="number" value={maxSalary} placeholder='Maximum Salary' onChange={(e) => setMaxSalary(e.target.value ? e.target.value : 0)} />
          </div>
        </div>
        <div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Job Title</th>
                <th>Pay Grade</th>
                <th>Basic Salary</th>
              </tr>
            </thead>
            <tbody>
              {data.map((employee, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{employee.Employee_ID}</td>
                  <td>{employee.First_Name} {employee.Last_Name}</td>
                  <td>{employee.Job_Title}</td>
                  <td>{employee.Pay_Grade}</td>
                  <td>{formatSalary(employee.Basic_Salary)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Report4;