import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Report3() {
  const { id_to_transfer } = useParams();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  const [customAttributes, setCustomAttributes] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState('');

  useEffect(() => {
    // Check user authentication using Axios
    axios.get("http://localhost:3000/isUserAuth", {
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
    // Fetch custom attributes from your API
    axios.get('http://localhost:3000/customAttributes')
      .then((response) => {
        setCustomAttributes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching custom attributes:', error);
      });

    // Fetch employee data with custom fields from your API
    axios.get('http://localhost:3000/employeeCustomAttributes')
      .then((response) => {
        setEmployeeData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  const handleAttributeChange = (event) => {
    setSelectedAttribute(event.target.value);
  };

  return (
    <div>
      <h1>Employee Custom Fields Report</h1>
      <div>
        <label htmlFor="customAttribute">Select Custom Attribute: </label>
        <select
          id="customAttribute"
          onChange={handleAttributeChange}
          value={selectedAttribute}
        >
          <option value="">Select an attribute</option>
          {customAttributes.map((attribute) => (
            <option key={attribute.Attribute_ID} value={attribute.Attribute_ID}>
              {attribute.Attribute_Name}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {employeeData
            .filter((employee) =>
              selectedAttribute
                ? employee.Attribute_ID === parseInt(selectedAttribute)
                : true
            )
            .map((employee) => (
              <tr key={employee.Employee_ID}>
                <td>{employee.Employee_ID}</td>
                <td>{employee.Value}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Report3;
