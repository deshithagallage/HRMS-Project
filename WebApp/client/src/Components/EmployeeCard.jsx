import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './EmployeeCard.css'; // Import the CSS file

function EmployeeCard({ employee, contactNumbers, supervisors}) {
  const cardStyle = {
    maxWidth: '1000px',
  };

  const cardBodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'left',
    fontSize: '20px',
  };

  console.log('employee:', employee);

  return (
    <Card style={cardStyle}>
      <Card.Header as="h5">Employee Data</Card.Header>
      <Card.Body>
        <Card.Text style={cardBodyStyle}>
          <div>
            Employee ID: {employee.Employee_ID}
          </div>
          <div>
            Name: {employee.First_Name} {employee.Last_Name}
          </div>
          <div>
            Username: {employee.User_ID}
          </div>
          <div>
            Gender: {employee.Gender}
          </div>
          <div>
            Marital Status: {employee.Marital_Status}
          </div>
          <div>
            Contact Numbers:
            <ul>
              {contactNumbers.map((contact, index) => (
                <li key={index}><h5>{contact.Contact_Number}</h5></li>
              ))}
            </ul>
          </div>
          <div>
            Email: {employee.Email}
          </div>
          <div>
            Employment Status: {employee.Employment_Status}
          </div>
          <div>
            Job title: {employee.Job_Title}
          </div>
          <div>
            Pay Grade: {employee.Pay_Grade}
          </div>
          <div>
            Branch: {employee.Branch_Name}
          </div>
          <div>
            Department: {employee.Dept_Name}
          </div>
          {/* <div style={{ marginBottom: '20px' }}> 
              Supervisor: {employee.Supervisor_ID}
            </div> */}
          {employee && employee.Supervisor_ID ? (
            <div style={{ marginBottom: '20px' }}> 
              Supervisor: {employee.SupFirstName} {employee.SupLastName}
            </div>
          ) : null}
          {employee && employee.Dependent_ID ? (
            <div>
              <div>Dependent ID: {employee.Dependent_ID}</div>
              <div>Dependent's Name: {employee.dFirst_Name} {employee.dLast_Name}</div>
              <div>Age: {employee.Age}</div>
              <div>Gender: {employee.dGender}</div>
              <div>Relation: {employee.Relation}</div>
            </div>
          ) : null}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default EmployeeCard;
