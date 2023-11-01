import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from 'axios';
import './styles/Report5.css';

function Report5() {
  const { id_to_transfer } = useParams();
  const navigate = useNavigate();
  const [supervisor, setSupervisor] = useState("");
  const [subordinates, setSubordinates] = useState([]);
  const [supervisors, setSupervisors] = useState([]);

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

  const fetchSupervisors = async () => {
    try {
      const response = await Axios.get(`http://localhost:3000/fetchSupervisors`);
      setSupervisors(response.data);
    } catch (error) {
      console.error("Error fetching supervisors: " + error);
    }
  };

  const fetchSubordinates = async () => {
    if (supervisor) {
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

  useEffect(() => {
    fetchSupervisors();
  }, []);

  return (
    <div className="report_background">
      <h1 className="headers">Supervisor Report</h1>
      <div className="select_supervisor_part">
        <label className="label_line">Select a Supervisor: </label>
        <select className="select" onChange={(e) => setSupervisor(e.target.value)}>
          <option className="option_part" value="">Select Supervisor</option>
          {supervisors.map((supervisor) => (
            <option className="option_part" key={supervisor.Supervisor_ID} value={supervisor.Supervisor_ID}>
              {supervisor.Supervisor_ID}
            </option>
          ))}
        </select>
        <button className="buttons" onClick={fetchSubordinates}>Show Subordinates</button>
      </div>
      <div className="SubordinatesList">
        <h2 className="headers2">Subordinates:</h2>
        <table className="subordinates-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {subordinates.map((subordinate, index) => (
              <tr key={index}>
                <td  style={{ width: "50%" }}>{subordinate.Subordinate_first_name} {subordinate.Subordinate_last_name}</td>
                <td  style={{ width: "50%" }}>{subordinate.Subordinate_ID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report5;