const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

require("dotenv").config();

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use((req, res, next) => {
  req.db = db;
  next();
});

const addEmployeeRouter = require("./routes/AddEmployee");
const viewEmployeeRouter = require("./routes/ViewEmployee");
const editEmployeeRouter = require("./routes/EditEmployee");

const employeeRouter = require("./routes/Employee");
const leaveRequestRouter = require("./routes/LeaveRequest");
const authenticateRouter = require("./routes/Authenticate");
const CustomAttributeRouter = require("./routes/CustomAttribute");
const passwordRouter = require("./routes/Password");

const report1Router = require("./routes/Report1");
const report2Router = require("./routes/Report2");
const report3Router = require("./routes/Report3");
const report4Router = require("./routes/Report4");
const report5Router = require("./routes/Report5");

app.use("/addEmployee", addEmployeeRouter);
app.use("/viewEmployee", viewEmployeeRouter);
app.use("/editEmployee", editEmployeeRouter);

app.use("/employee", employeeRouter);
app.use("/leaveRequest", leaveRequestRouter);
app.use("/authenticate", authenticateRouter);
app.use("/customAttribute", CustomAttributeRouter);
app.use("/password", passwordRouter);

app.use("/report1", report1Router);
app.use("/report2", report2Router);
app.use("/report3", report3Router);
app.use("/report4", report4Router);
app.use("/report5", report5Router);



app.get("/fetchLeaveRequests", (req, res) => {
  const query = "SELECT * FROM leave_request";
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error querying the database: " + error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

// Function to fetch employee data based on the given query
function fetchEmployeeData(req, res, query) {
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
}



app.listen(3000, () => {
  console.log("Yey, your server is running on port 3000");
});
