import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from 'axios';

function Report5() {
  const { id_to_transfer } = useParams();
  const navigate = useNavigate();
  
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

  return (
    <div>
      <h1>Page for report 5</h1>
    </div>
  );
}

export default Report5;