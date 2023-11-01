// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Report2.css';
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
      HRManager: hrManagerData,
      SoftwareEngineer: softwareEngineerData,
      Accountant: accountantData,
      QAEngineear: qaEngineerData,
      Finance: financeData,
      HR: hrData,
      Account: accountingData,
      Engineering: engineeringData,
      PayGradeL1: payGrade1Data,
      PayGradeL2: payGrade2Data,
      PayGradeL3: payGrade3Data,
      PayGradeL4: payGrade4Data,
      PayGradeL5: payGrade5Data,
      PayGradeL6: payGrade6Data,
      PayGradeL7: payGrade7Data,
      PayGradeL8: payGrade8Data,
      PayGradeL9: payGrade9Data,
      PayGradeL10: payGrade10Data,
      Branch1: branch1Report,
      Branch2: branch2Report,
      Branch3: branch3Report,
      Branch4: branch4Report,
      Branch5: branch5Report,
      Branch6: branch6Report,
      Branch7: branch7Report,
      Branch8: branch8Report,
      Branch9: branch9Report,
    Branch10: branch10Report,
      
      
   
    };
    const handleDropdownChange = (event) => {
      setSelectedReport(event.target.value);
    };
    const renderDropdown = () => (
      <div>
        <label>Select a Report:</label>
        <select onChange={handleDropdownChange} value={selectedReport}>
          <option value="HRManager">HR Manager Employee Data</option>
          <option value="SoftwareEngineer">Software Engineer Employee Data</option>
          <option value="Accountant">Accountant Employee Data</option>
          <option value="QAEngineer">QA Engineer Employee Data</option>
        
          <option value="Engineering">Engineering Department Employee Data</option>
          <option value="HR">HR Department Employee Data</option>
          <option value="Account">Account Department Employee Data</option>
          <option value="Finance">Finance Department Employee Data</option>
         
        <option value="PayGradeL1">PayGrade L1 Employee Data</option>
        <option value="PayGradeL2">PayGrade L2 Employee Data</option>
        <option value="PayGradeL3">PayGrade L3 Employee Data</option>
        <option value="PayGradeL4">PayGrade L4 Employee Data</option>
        <option value="PayGradeL5">PayGrade L5 Employee Data</option>
        <option value="PayGradeL6">PayGrade L6 Employee Data</option>
        <option value="PayGradeL7">PayGrade L7 Employee Data</option>
        <option value="PayGradeL8">PayGrade L8 Employee Data</option>
        <option value="PayGradeL9">PayGrade L9 Employee Data</option>
        <option value="PayGradeL10">PayGrade L10 Employee Data</option>
        <option value="Branch1"> Branch1 Employee Data</option>
        <option value="Branch2"> Branch2 Employee Data</option>
        <option value="Branch3"> Branch3 Employee Data</option>
        <option value="Branch4"> Branch4 Employee Data</option>
        <option value="Branch5"> Branch5 Employee Data</option>
        <option value="Branch6"> Branch6 Employee Data</option>
        <option value="Branch7"> Branch7 Employee Data</option>
        <option value="Branch8"> Branch8 Employee Data</option>
        <option value="Branch9"> Branch9 Employee Data</option>
      <option value="Branch10"> Branch10 Employee Data</option>
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