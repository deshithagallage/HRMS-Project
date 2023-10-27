import React, { useState, useEffect } from "react";
import Axios from 'axios';

function SupervisorReport() {
  const [supervisor, setSupervisor] = useState(""); // State variable to track selected supervisor
  const [subordinates, setSubordinates] = useState([]); // State variable to store subordinates data
  const [supervisors, setSupervisors] = useState([]); // State variable to store supervisors data

  // Function to fetch supervisors from the server
  const fetchSupervisors = async () => {
    try {
      const response = await Axios.get(`http://localhost:3000/fetchSupervisors`); // Replace with your API endpoint
      setSupervisors(response.data);
    } catch (error) {
      console.error("Error fetching supervisors: " + error);
    }
  };

  // Function to fetch subordinates of the selected supervisor
  const fetchSubordinates = async () => {
    if (supervisor) { // Only fetch if a supervisor is selected
      try {
        const response = await Axios.get(`http://localhost:3000/supervisorReport/${supervisor}`);
        if (response.data) {
          setSubordinates(response.data);
        } else {
          console.error("Received empty response from the server.");
        }
      } catch (error) {
        console.error("Error fetching subordinates: " + error);
      }
    }
  };

  // Use useEffect to fetch supervisors when the component mounts
  useEffect(() => {
    fetchSupervisors();
  }, []);

  return (
    <div>
      <h1>Supervisor Report</h1>
      <div>
        <label>Select a Supervisor: </label>
        <select onChange={(e) => setSupervisor(e.target.value)}>
          <option value="">Select Supervisor</option>
          {supervisors.map((supervisor) => (
            <option key={supervisor.Supervisor_ID} value={supervisor.Supervisor_ID}>
              {supervisor.Supervisor_ID}
            </option>
          ))}
        </select>
        <button onClick={fetchSubordinates}>Show Subordinates</button>
      </div>
      <div>
        <h2>Subordinates:</h2>
        <ul>
          {subordinates.map((subordinate, index) => (
            <li key={index}>
              {subordinate.Subordinate_first_name} {subordinate.Subordinate_last_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SupervisorReport;