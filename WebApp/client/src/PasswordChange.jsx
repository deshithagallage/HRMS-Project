import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/PageHR.css'; // Import the CSS file
import { NavLink } from 'react-router-dom';

function handleLogout() {
  // Remove the token from local storage
  localStorage.removeItem("token");
}

function PasswordChange() {
  const { id_to_transfer } = useParams();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

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

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }

    // Send a POST request to change the password
    Axios.post(`http://localhost:3000/changePassword/${id_to_transfer}`, {
      id_to_transfer: { id_to_transfer },
      oldPassword: oldPassword,
      newPassword: newPassword,
    })
      .then((response) => {
        if (response.status === 200) {
          // Password change successful
          setMessage('Password changed successfully.');
          setOldPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } else if (response.status === 401) {
          // Old password is incorrect
          setMessage('Old password is incorrect.');
        } else {
          // Password change failed for other reasons
          setMessage('Password change failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage('An error occurred. Please try again later.');
      });
  };

  return (
    <div className="page-container">
        <div className="sidebar">
        <div style={{ marginTop: '20px', marginBottom: '40px', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <h2>Jupiter Apparels</h2>
        </div>
        <ul>
        <li>
            <NavLink to={`/PageEMP/${id_to_transfer}/`} >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={`/PageEMP/${id_to_transfer}/LeaveReq/`} >
              Leave Request
            </NavLink>
          </li>
          <li>
            <NavLink to={`/PageEMP/${id_to_transfer}/PasswordChange`} >
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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="text-center mb-4">Password Reset</h1>
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label>Old Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>New Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-4">
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default PasswordChange;
