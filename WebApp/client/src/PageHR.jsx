import React, { useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './styles/PageHR.css'; // Import the CSS file
import GeographyChart from "./Components/GeographyChart";
import StatBox from "./Components/StatBox";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "./themes/theme";
import { mockTransactions } from "./data/mockData";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LineChart from "./Components/LineChart";

function PageHR() {
  const { id_to_transfer } = useParams();
  console.log('id_to_transfer in PageHR:', id_to_transfer);
  const navigate = useNavigate(); // Define the navigate function

  // Handler for the sidebar navigation
  const handleSidebarLinkClick = (path) => {
    navigate(path);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
    <div className="page-container">
      <div className="sidebar">
      <div style={{ marginTop: '20px',marginBottom:'40px',display: 'flex',alignItems: 'center', textAlign: 'center' }}>
        <h2>Jupiter Apparels</h2></div>
        <ul>
        <li>
            <NavLink to={`/PageHR/${id_to_transfer}`} activeClassName="active-link">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={`/PageHR/${id_to_transfer}/EmployeeManagement`} activeClassName="active-link">
              Employee Management
            </NavLink>
          </li>
          <li>
            <NavLink to={`/PageHR/${id_to_transfer}/AddCustom`} activeClassName="active-link">
              Add Custom Attribute
            </NavLink>
          </li>
          <li>
            <NavLink to={`/PageHR/${id_to_transfer}/ReportGenaration`} activeClassName="active-link">
              Report Generation
            </NavLink>
          </li>
          <li>
          <NavLink to={`/`} activeClassName="active-link">
            Log out
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="content">
        <Box m="20px">
       <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          backgroundColor="#f0f0f0" // Background color
          color="white" // Text color
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor="#f0f0f0" 
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor="#f0f0f0" 
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        

        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor="#f0f0f0" 
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
                {/* ROW 2 */}
                <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
  
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
           Branches
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
        </Box>
        </Box>
 
      </div>
    </div>
  );
}

export default PageHR;