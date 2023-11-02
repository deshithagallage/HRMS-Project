// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Report.css';
const Report2 = () => {
  const [selectedReport, setSelectedReport] = useState('Colombo Central Branch');//new

  // State to store the employee data for HR Manage
  const [branch1Report, setBranch1Data] = useState([]);
  const [branch2Report, setBranch2Data] = useState([]);
  const [branch3Report, setBranch3Data] = useState([]);
  const [branch4Report, setBranch4Data] = useState([]);
  const [branch5Report, setBranch5Data] = useState([]);
  const [branch6Report, setBranch6Data] = useState([]);
  const [branch7Report, setBranch7Data] = useState([]);
  const [branch8Report, setBranch8Data] = useState([]);
  const [branch9Report, setBranch9Data] = useState([]);
  const [branch10Report, setBranch10Data] = useState([]);
  
  // Function to fetch employee data for HR Managers from your API


    // Create an object to map report type to data
    const reportData = {
      'Colombo Central Branch': branch1Report,
      'Colombo North Branch': branch2Report,
      'Kandy Downtown Branch': branch3Report,
      'Galle Coastal Branch': branch4Report,
      'Jaffna Northern Branch': branch5Report,
      'Negombo Seaside Branch': branch6Report,
      'Dhaka Central Branch': branch7Report,
      'Chittagong Coastal Branch': branch8Report,
      'Islamabad Capital Branch': branch9Report,
      'Lahore Cultural Branch': branch10Report,
      
      
   
    };
    const handleDropdownChange = (event) => {
      setSelectedReport(event.target.value);
    };
    const renderDropdown = () => (
      <div>
        <label>Select a Report:</label>
        <select onChange={handleDropdownChange} value={selectedReport}>
        
      
        <option value="Colombo Central Branch"> Branch1 Employee Data</option>
        <option value="Colombo North Branch"> Branch2 Employee Data</option>
        <option value="Kandy Downtown Branch"> Branch3 Employee Data</option>
        <option value="Galle Coastal Branch"> Branch4 Employee Data</option>
        <option value="Jaffna Northern Branch"> Branch5 Employee Data</option>
        <option value="Negombo Seaside Branch"> Branch6 Employee Data</option>
        <option value="Dhaka Central Branch"> Branch7 Employee Data</option>
        <option value="Chittagong Coastal Branch"> Branch8 Employee Data</option>
        <option value="Islamabad Capital Branch"> Branch9 Employee Data</option>
        <option value="Lahore Cultural Branch"> Branch10 Employee Data</option>
        </select>
      </div>
    );
    const selectedReportData = reportData[selectedReport];

  useEffect(() => {
    fetchData();
  
  }, []); // Fetch data when the component mounts
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const fetchData = async (url, setDataFunction) => {
    try {
      const response = await axios.get(url);
      setDataFunction(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 

  fetchData('http://localhost:3000/employee_data_Branch_1',setBranch1Data);
  fetchData('http://localhost:3000/employee_data_Branch_2',setBranch2Data);
  fetchData('http://localhost:3000/employee_data_Branch_3',setBranch3Data);
  fetchData('http://localhost:3000/employee_data_Branch_4',setBranch4Data);
  fetchData('http://localhost:3000/employee_data_Branch_5',setBranch5Data);
  fetchData('http://localhost:3000/employee_data_Branch_6',setBranch6Data);
  fetchData('http://localhost:3000/employee_data_Branch_7',setBranch7Data);
  fetchData('http://localhost:3000/employee_data_Branch_8',setBranch8Data);
  fetchData('http://localhost:3000/employee_data_Branch_9',setBranch9Data);
 fetchData('http://localhost:3000/employee_data_Branch_10',setBranch10Data);

   const renderTable = (data, title) => (
    <div>
      <h1>{title}</h1>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Birthday</th>
            <td>Pay_Grade_ID</td>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee.Employee_ID}>
              <td>{employee.Employee_ID}</td>
              <td>{employee.Full_Name}</td>
             
              <td>{employee.Gender}</td>
             
              <td>{formatDate(employee.Birthday)}</td>
              <td>{employee.Pay_Grade_ID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  

  return (
   
<dev>
{renderDropdown()}
{renderTable(selectedReportData,selectedReport)}
</dev>
  );
};

export default Report2;
