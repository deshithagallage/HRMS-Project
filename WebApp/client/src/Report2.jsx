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

  const [selectedReport, setSelectedReport] = useState('BR001');
  const [reportData, setReportData] = useState([]);
  
  const handleDropdownChange = (event) => {
    setSelectedReport(event.target.value);
  };

  const renderDropdown = () => (
    <div>
      <label className='lable'><b>Select a Report:</b></label>
      <select className= "custom-dropdown-container" onChange={handleDropdownChange} value={selectedReport} >
        <option value="BR001">Colombo Central Branch</option>
        <option value="BR002">Colombo North Branch</option>
        <option value="BR003">Kandy Downtown Branch</option>
        <option value="BR004">Galle Coastal Branch</option>
        <option value="BR005">Jaffna Northern Branch</option>
        <option value="BR006">Negombo Seaside Branch</option>
        <option value="BR007">Dhaka Central Branch</option>
        <option value="BR008">Chittagong Coastal Branch</option>
        <option value="BR009">Islamabad Capital Branch</option>
      <option value="BR0010">Lahore Cultural Branch</option>
      </select>
    </div>
  );

  useEffect(() => {
    //fetchData(selectedReport);
    console.log("hello");
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

    //need to debug

  }, [selectedReport]);

  // eslint-disable-next-line no-unused-vars
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

   const renderTable = (data, title) => (
    
     <div>
       <h3 className='branchID'>Branch ID - {title}</h3>
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
