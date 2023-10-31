import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReportOneTable from "./Components/ReportOneTable";

function Report1() {
  const { id_to_transfer } = useParams();
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [hrLeaveRequests, setHrLeaveRequests] = useState([]);
  const [financeLeaveRequests, setFinanceLeaveRequests] = useState([]);
  const [engineeringLeaveRequests, setEngineeringLeaveRequests] = useState([]);
  const [accountingLeaveRequests, setAccountingLeaveRequests] = useState([]);
  const [time, setTime] = useState("year"); // Default to "last year"

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
    async function fetchLeaveRequests() {
      try {
        const response = await axios.get("http://localhost:3000/fetchLeaveRequestsDept", {
          params: { time }
        });
        setLeaveRequests(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchLeaveRequests();
  }, [time]);

  useEffect(() => {
    // Categorize leave requests into different department lists
    const hrRequests = leaveRequests.filter((request) => request.Dept_Name === "Human Resources");
    const financeRequests = leaveRequests.filter((request) => request.Dept_Name === "Finance");
    const engineeringRequests = leaveRequests.filter((request) => request.Dept_Name === "Engineering");
    const accountingRequests = leaveRequests.filter((request) => request.Dept_Name === "Accounting");

    setHrLeaveRequests(hrRequests);
    setFinanceLeaveRequests(financeRequests);
    setEngineeringLeaveRequests(engineeringRequests);
    setAccountingLeaveRequests(accountingRequests);
  }, [leaveRequests]);

  return (
    <div>
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Total leaves in a given period by department</h1> </div>
      <div style={{  margin: "20px auto", maxWidth: "90%" }}>
        <h2 >Human Resources Department</h2>
        <ReportOneTable allRequests={hrLeaveRequests} />
      </div>
      <div style={{  margin: "20px auto", maxWidth: "90%" }}>
        <h2>Finance Department</h2>
        <ReportOneTable allRequests={financeLeaveRequests} />
      </div>
      <div style={{  margin: "20px auto", maxWidth: "90%" }}>
        <h2>Engineering Department</h2>
        <ReportOneTable allRequests={engineeringLeaveRequests} />
      </div>
      <div style={{  margin: "20px auto", maxWidth: "90%" }}>
        <h2>Accounting Department</h2>
        <ReportOneTable allRequests={accountingLeaveRequests} />
      </div>
    </div>
  );
}

export default Report1;
