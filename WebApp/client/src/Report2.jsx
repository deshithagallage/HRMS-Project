// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import './styles/Report2.css';

const Report2 = () => {
  const { id_to_transfer } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Check user authentication using Axios
    axios.get("http://localhost:3000/authenticate/isUserAuth", {
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

  const [selectedReport, setSelectedReport] = useState("Nothing Selected");
  const [reportData, setReportData] = useState([]);
  
  const handleDropdownChange = (event) => {
    setSelectedReport(event.target.value);
  };

  const [branchOptions, setBranchOptions] = useState ([]);
  useEffect(() => {
    axios.get("http://localhost:3000/addEmployee/branch")
      .then(response => {
        setBranchOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderDropdown = () => (
    <div className="d-flex justify-content-start" style={{ gap: '20px', margin: '3%' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <label htmlFor="inputBranch" style={{ padding: '5px' }}>Branch: </label>
        <select className="form-control" id="inputBranch" name="branch" onChange={handleDropdownChange}>
          <option value={"Nothing Selected"}>Choose...</option>
          {branchOptions.map(option => (
            <option value={option.Branch_ID}>
              {option.Branch_Name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <label htmlFor="inputBranchID" style={{ padding: '5px' }}>ID: </label>
        <input className="form-control" id="inputBranchID" name="branchID" value={selectedReport} disabled={true} />
      </div>

    </div>

  );

  useEffect(() => {
    console.log(selectedReport);

    //need to debug
    axios.get("http://localhost:3000/report2/employee_data",{params :{selectedReport : selectedReport} })
    .then((response) => {
      console.log(response);
      setReportData(response.data);
    })
    .catch((error) => {
      console.error("error",error);
    });

  }, [selectedReport]);

  // eslint-disable-next-line no-unused-vars
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

   const renderTable = (data, title) => (
    
     <div>
       <table className="custom-table">
         <thead>
           <tr>
             <th>Employee ID</th>
             <th>Name</th>
             <th>Gender</th>
             <th>Birthday</th>
             <th>Pay Grade ID</th>
           </tr>
         </thead>
         <tbody>
         {Array.isArray(data) ? (
          data.map((employee,index) => (
            <tr key={employee.Employee_ID} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{employee.Employee_ID}</td>
              <td>{employee.Full_Name}</td>
              <td>{employee.Gender}</td>
              <td>{formatDate(employee.Birthday)}</td>
              <td>{employee.Pay_Grade_ID}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No data available</td>
          </tr>
        )}
      </tbody>
       </table>
     </div>
   );

  return (
    <div>
      {console.log("Report Data",reportData.data)}
      {renderDropdown()}
      {renderTable(reportData, selectedReport)} 
    </div>
  );
};

export default Report2;
