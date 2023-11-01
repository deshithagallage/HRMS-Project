// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Report.css';
const Report2 = () => {
  const [selectedReport, setSelectedReport] = useState('HRManager');//new

  // State to store the employee data for HR Managers
  const [hrManagerData, setHRManagerData] = useState([]);
  const [softwareEngineerData, setSoftwareEngineerData] = useState([]);
  const [accountantData, setAccountantData] = useState([]);
  const [qaEngineerData, setQAEngineerData] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  const [hrData, setHrData] = useState([]);
  const [accountingData, setAccountingData] = useState([]);
  const [engineeringData, setEngineeringData] = useState([]);
  const [payGrade1Data, setPayGrade1Data] = useState([]);
  const [payGrade2Data, setPayGrade2Data] = useState([]);
  const [payGrade3Data, setPayGrade3Data] = useState([]);
  const [payGrade4Data, setPayGrade4Data] = useState([]);
  const [payGrade5Data, setPayGrade5Data] = useState([]);
  const [payGrade6Data, setPayGrade6Data] = useState([]);
  const [payGrade7Data, setPayGrade7Data] = useState([]);
  const [payGrade8Data, setPayGrade8Data] = useState([]);
  const [payGrade9Data, setPayGrade9Data] = useState([]);
  const [payGrade10Data, setPayGrade10Data] = useState([]);
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
      'HR Manager Employee Data': hrManagerData,
      'Software Engineer Employee Data': softwareEngineerData,
      'Accountant Employee Data': accountantData,
      'QA Engineer Employee Data': qaEngineerData,
      'Finance Department Employee Data': financeData,
      'HR Department Employee Data': hrData,
      'Account Department Employee Data': accountingData,
      'Engineering Department Employee Data': engineeringData,
      'PayGrade L1 Employee Data': payGrade1Data,
      'PayGrade L2 Employee Data': payGrade2Data,
      'PayGrade L3 Employee Data': payGrade3Data,
      'PayGrade L4 Employee Data': payGrade4Data,
      'PayGrade L5 Employee Data': payGrade5Data,
      'PayGrade L6 Employee Data': payGrade6Data,
      'PayGrade L7 Employee Data': payGrade7Data,
      'PayGrade L8 Employee Data': payGrade8Data,
      'PayGrade L9 Employee Data': payGrade9Data,
      'PayGrade L10 Employee Data': payGrade10Data,
      'Branch1 Employee Data': branch1Report,
      'Branch2 Employee Data': branch2Report,
      'Branch3 Employee Data': branch3Report,
      'Branch4 Employee Data': branch4Report,
      'Branch5 Employee Data': branch5Report,
      'Branch6 Employee Data': branch6Report,
      'Branch7 Employee Data': branch7Report,
      'Branch8 Employee Data': branch8Report,
      'Branch9 Employee Data': branch9Report,
    'Branch10 Employee Data': branch10Report,
      
      
   
    };
    const handleDropdownChange = (event) => {
      setSelectedReport(event.target.value);
    };
    const renderDropdown = () => (
      <div>
        <label>Select a Report:</label>
        <select onChange={handleDropdownChange} value={selectedReport}>
          <option value="HR Manager Employee Data">HR Manager Employee Data</option>
          <option value="Software Engineer Employee Data">Software Engineer Employee Data</option>
          <option value="Accountant Employee Data">Accountant Employee Data</option>
          <option value="QA Engineer Employee Data">QA Engineer Employee Data</option>
        
          <option value="Engineering Department Employee Data">Engineering Department Employee Data</option>
          <option value="HR Department Employee Data">HR Department Employee Data</option>
          <option value="Account Department Employee Data">Account Department Employee Data</option>
          <option value="Finance Department Employee Data">Finance Department Employee Data</option>
         
        <option value="PayGrade L1 Employee Data">PayGrade L1 Employee Data</option>
        <option value="PayGrade L2 Employee Data">PayGrade L2 Employee Data</option>
        <option value="PayGrade L3 Employee Data">PayGrade L3 Employee Data</option>
        <option value="PayGrade L4 Employee Data">PayGrade L4 Employee Data</option>
        <option value="PayGrade L5 Employee Data">PayGrade L5 Employee Data</option>
        <option value="PayGrade L6 Employee Data">PayGrade L6 Employee Data</option>
        <option value="PayGrade L7 Employee Data">PayGrade L7 Employee Data</option>
        <option value="PayGrade L8 Employee Data">PayGrade L8 Employee Data</option>
        <option value="PayGrade L9 Employee Data">PayGrade L9 Employee Data</option>
        <option value="PayGrade L10 Employee Data">PayGrade L10 Employee Data</option>
        <option value="Branch1 Employee Data"> Branch1 Employee Data</option>
        <option value="Branch2 Employee Data"> Branch2 Employee Data</option>
        <option value="Branch3 Employee Data"> Branch3 Employee Data</option>
        <option value="Branch4 Employee Data"> Branch4 Employee Data</option>
        <option value="Branch5 Employee Data"> Branch5 Employee Data</option>
        <option value="Branch6 Employee Data"> Branch6 Employee Data</option>
        <option value="Branch7 Employee Data"> Branch7 Employee Data</option>
        <option value="Branch8 Employee Data"> Branch8 Employee Data</option>
        <option value="Branch9 Employee Data"> Branch9 Employee Data</option>
      <option value="Branch10 Employee Data"> Branch10 Employee Data</option>
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

  fetchData('http://localhost:3000/employee_data_Title_HRManager',setHRManagerData);
  fetchData('http://localhost:3000/employee_data_Title_SoftwareEngineer',setSoftwareEngineerData);
  fetchData('http://localhost:3000/employee_data_Title_Accountant',setAccountantData);
  fetchData('http://localhost:3000/employee_data_Title_QA_Engineer',setQAEngineerData);
  fetchData('http://localhost:3000/employee_data_FinanceDepartmentEmployeeData',setFinanceData);
  fetchData('http://localhost:3000/employee_data_HRDepartmentEmployeeData',setHrData);
  fetchData('http://localhost:3000/employee_data_AccountingDepartmentEmployeeData',setAccountingData);
  fetchData('http://localhost:3000/employee_data_EngineeringDepartmentEmployeeData',setEngineeringData);
  fetchData('http://localhost:3000/employee_data_pay_grade_1',setPayGrade1Data);
  fetchData('http://localhost:3000/employee_data_pay_grade_2',setPayGrade2Data);
  fetchData('http://localhost:3000/employee_data_pay_grade_3',setPayGrade3Data);
  fetchData('http://localhost:3000/employee_data_pay_grade_4',setPayGrade4Data);
  fetchData('http://localhost:3000/employee_data_pay_grade_5',setPayGrade5Data);
  fetchData('http://localhost:3000/employee_data_pay_grade_6',setPayGrade6Data);
  fetchData('http://localhost:3000/employee_data_pay_grade_7',setPayGrade7Data);
  fetchData('http://localhost:3000/employee_data_pay_grade_8',setPayGrade8Data);
  fetchData('http://localhost:3000/employee_data_pay_grade_9',setPayGrade9Data);
  fetchData('http://localhost:3000/employee_data_pay_grade_10',setPayGrade10Data);

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
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Marital Status</th>
            <th>Birthday</th>
            <th>Email</th>
            <th>Employment Status</th>
            <th>Pay Grade ID</th>
            <th>Branch ID</th>
            <th>Department ID</th>
            <th>Dependent ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee.Employee_ID}>
              <td>{employee.Employee_ID}</td>
              <td>{employee.First_Name}</td>
              <td>{employee.Last_Name}</td>
              <td>{employee.Gender}</td>
              <td>{employee.Marital_Status}</td>
              <td>{formatDate(employee.Birthday)}</td>
              <td>{employee.Email}</td>
              <td>{employee.Employment_Status}</td>
              <td>{employee.Pay_Grade_ID}</td>
              <td>{employee.Branch_ID}</td>
              <td>{employee.Dept_ID}</td>
              <td>{employee.Dependent_ID}</td>
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
