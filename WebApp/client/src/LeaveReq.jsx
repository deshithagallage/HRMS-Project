import React, { useState, useEffect } from "react";
import Axios from "axios";
import './styles/LeaveReq.css'; // Import the CSS file
import { useParams, useNavigate } from "react-router-dom";
import LeaveCard from "./Components/LeaveCard.jsx"
import LeaveTable from "./Components/pendingReqTable.jsx"
import RejectTable from "./Components/rejectedTable.jsx"
import './styles/PageHR.css'; // Import the CSS file
import { NavLink } from 'react-router-dom';

function handleLogout() {
  // Remove the token from local storage
  localStorage.removeItem("token");
}

function LeaveReq() {
  const { id_to_transfer } = useParams();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [day_no, setNumDays] = useState(0);
  const [type, setType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [pendingRequests, setPendingRequests] = useState([]);
  const [setAllLeaves, setfetchAllLeaves] = useState({});
  const [settakenLeaves, settakenAllLeaves] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [rejectedRequests, setRejectedRequests] = useState([]);

  useEffect(() => {
    // Check user authentication using Axios
    Axios.get("http://localhost:3000/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (
          response.data.userID === id_to_transfer &&
          (response.data.jobTitle === 'Software Engineer' ||
          response.data.jobTitle === 'QA Engineer' ||
          response.data.jobTitle === 'Accountant')
        ) {} 
        else {
          navigate(`/`);
        }
      })
      .catch((error) => {
        console.error(error);
        navigate(`/`);
      });
  }, [id_to_transfer, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pending, allLeaves, takenLeaves,rejectedRequests] = await Promise.all([
          Axios.get(`http://localhost:3000/pendingLeaveRequests/${id_to_transfer}`),
          Axios.get(`http://localhost:3000/fetchAllLeaves/${id_to_transfer}`),
          Axios.get(`http://localhost:3000/fetchtakenLeaves/${id_to_transfer}`),
          Axios.get(`http://localhost:3000/rejectedLeaveRequests/${id_to_transfer}`),
        ]);

        setPendingRequests(pending.data);
        setfetchAllLeaves(allLeaves.data);
        settakenAllLeaves(takenLeaves.data);
        setRejectedRequests(rejectedRequests.data);

        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id_to_transfer]);

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  const remainingAnnualLeaves = Object.values(setAllLeaves)[0].Annual - Object.values(settakenLeaves)[0].Annual;
  const remainingCasualLeaves = Object.values(setAllLeaves)[0].Casual - Object.values(settakenLeaves)[0].Casual;
  const remainingNoPayLeaves = Object.values(setAllLeaves)[0].No_Pay - Object.values(settakenLeaves)[0].No_Pay;
  let remainingMaternityLeaves;

if (Object.values(setAllLeaves)[0].Gender === 'Female') {
  console.log("Isara");
  remainingMaternityLeaves = Object.values(setAllLeaves)[0].Maternity_Leave - Object.values(settakenLeaves)[0].Maternity_Leave;
} else {
  remainingMaternityLeaves = "Undefined";
}

if (type === "annual") {
  // Iterate through pendingRequests to check if there's an existing "Annual" request
  const hasAnnualRequest = pendingRequests.some((request) => request.type === "annual");}

  const addEmployee = async () => {
    try {
      if (id === id_to_transfer ) {
        console.log(id,type)
        if ((type == "annual" && day_no <= remainingAnnualLeaves) | (type == "casual" && day_no <= remainingCasualLeaves) | (type == "no_pay" && day_no <= remainingNoPayLeaves) | (type == "maternity" && day_no <= remainingMaternityLeaves)) {
          if((type == "maternity" && Object.values(setAllLeaves)[0].Gender === 'Female') | (type != "maternity")){
        await Axios.post("http://localhost:3000/createLeaveReq", {
          id: id,
          startDate: startDate,
          day_no: day_no,
          type: type,
        });
        setSuccessMessage("Your request submitted");
        setErrorMessage("");
        window.location.reload();
      }else{
        setErrorMessage("You can't reqest maternity leaves");
        setSuccessMessage("");
      }} 
      else{
        setErrorMessage("You don't have enough leaves");
        setSuccessMessage("");
      }
    } else {
        setErrorMessage("Invalid ID");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("");
      setErrorMessage("Failed to submit request");
    }
  };

  const deleteRequest = async (requestId) => {
    try {
      await Axios.delete(`http://localhost:3000/deleteLeaveRequest/${requestId}`);

      setPendingRequests((prevRequests) => prevRequests.filter((request) => request.Leave_Req_ID !== requestId));
      setSuccessMessage("Request deleted successfully");
    } catch (error) {
      console.error("Error deleting request:", error);
      setErrorMessage("Failed to delete request");
    }
  };

  return (
    <div className="page-container">
        <div className="sidebar">
        <div style={{ marginTop: '20px', marginBottom: '40px', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <h2>Jupiter Apparels</h2>
        </div>
        <ul>
        <li>
            <NavLink to={`/PageEMP/${id_to_transfer}`} >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={`/PageEMP/${id_to_transfer}/LeaveReq`} activeClassName="active-link">
              Leave Request
            </NavLink>
          </li>
          <li>
            <NavLink to={`/PageEMP/${id_to_transfer}/PasswordChange`} activeClassName="active-link">
              Reset Password
            </NavLink>
          </li>
          <li>
            <NavLink to={`/`} activeClassName="active-link" onClick={handleLogout}>
              Log out
            </NavLink>
          </li>
        </ul>
      </div>
       <div className="content">
    <div className="container mt-5">
    <div className="leave-info">
    <h2 style={{ textAlign: 'center' }}>Remaining Leaves</h2>
          <div className="d-flex flex-row">
        <LeaveCard title="Annual Leaves" days={remainingAnnualLeaves} />
        <LeaveCard title="Casual Leaves" days={remainingCasualLeaves} />
        <LeaveCard title="No Pay Leaves" days={remainingNoPayLeaves} />
        <LeaveCard title="Maternity" days={remainingMaternityLeaves} />
      </div>
    </div>
      <div className="information">
      <h2 style={{ textAlign: 'center' }}>Leave Request Form</h2>

        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}
        <div className="mb-3">
          <label htmlFor="employeeId" className="form-label">
            Employee ID:
          </label>
          <input
            type="text"
            className="form-control"
            id="employeeId"
            onChange={(event) => {
              setId(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Start Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            onChange={(event) => {
              setStartDate(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="numDays" className="form-label">
            Number of Days:
          </label>
          <input
            type="number"
            className="form-control"
            id="numDays"
            onChange={(event) => {
              setNumDays(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="leaveType" className="form-label">
            Leave Type:
          </label>
          <select
            className="form-control"
            id="leaveType"
            onChange={(event) => {
              setType(event.target.value);
            }}
          >
            <option value="">Select Leave Type</option>
            <option value="annual">Annual</option>
            <option value="casual">Casual</option>
            <option value="no_pay">No Pay</option>
            <option value="maternity">Maternity</option>
          </select>
        </div>
        <div className="mb-3">
        <button className="btn btn-primary" onClick={addEmployee}>
          Submit Request
        </button>
        </div>
      </div>

      <div className="mt-5">
      <LeaveTable pendingRequests={pendingRequests} deleteRequest={deleteRequest} />
      <RejectTable rejectedRequests={rejectedRequests} />
      </div>
    </div>
    </div>
    </div>
  );
}


export default LeaveReq;
