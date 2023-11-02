const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const argon2 = require("argon2");

const jwt = require("jsonwebtoken");

require("dotenv").config();

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.post("/createCustomAttribute", (req, res) => {
  const attributeName = req.body.attributeName;

  db.query(
    "INSERT INTO Custom_Attribute_Definition (Attribute_Name) VALUES (?)",
    [attributeName],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error creating custom attribute");
      } else {
        res.status(200).send("Custom attribute created successfully");
      }
    }
  );
});

app.post("/associateCustomAttribute", (req, res) => {
  const { employeeID, attributeID, value } = req.body;

  // First, check if the provided Employee ID and Attribute ID exist in their respective tables.
  const checkQuery = "SELECT * FROM Employee_Data WHERE Employee_ID = ?";
  db.query(checkQuery, [employeeID], (error, results) => {
    if (error) {
      console.error("Error checking Employee Data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(500).json({ message: "Employee ID does not exist" });
    }

    const attributeCheckQuery =
      "SELECT * FROM Custom_Attribute_Definition WHERE Attribute_ID = ?";
    db.query(
      attributeCheckQuery,
      [attributeID],
      (attributeError, attributeResults) => {
        if (attributeError) {
          console.error(
            "Error checking Custom Attribute Definition:",
            attributeError
          );
          return res.status(500).json({ message: "Internal server error" });
        }

        if (attributeResults.length === 0) {
          return res
            .status(500)
            .json({ message: "Attribute ID does not exist" });
        }

        // If both Employee ID and Attribute ID exist, proceed to insert into Employee_Custom_Attribute table.
        const insertQuery =
          "INSERT INTO Employee_Custom_Attribute (Attribute_ID, Employee_ID, Value) VALUES (?, ?, ?)";
        db.query(
          insertQuery,
          [attributeID, employeeID, value],
          (insertError) => {
            if (insertError) {
              console.error(
                "Error inserting into Employee_Custom_Attribute:",
                insertError
              );
              return res.status(500).json({ message: "Internal server error" });
            }

            return res.status(200).json({
              message: "Custom attribute added to the employee successfully",
            });
          }
        );
      }
    );
  });
});

app.get("/customAttributes", (req, res) => {
  db.query("SELECT * FROM Custom_Attribute_Definition", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching custom attributes");
    } else {
      res.status(200).send(result);
    }
  });
});

app.get("/employeeCustomAttributes", (req, res) => {
  // Fetch employee data with custom fields from the database
  const query = "SELECT * FROM Employee_Custom_Attribute";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching employee data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.post("/createLeaveReq", (req, res) => {
  const id = req.body.id;
  const startDate = req.body.startDate;
  const day_no = req.body.day_no;
  const type = req.body.type;

  console.log(id, startDate, day_no, type);

  db.query(
    "INSERT INTO leave_request (Employee_ID, Start_Date, No_of_Days, Type, Status) VALUES (?,?,?,?,'Pending')",
    [id, startDate, day_no, type],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

//fetching emplyee details

app.get("/emp_view/:id_to_transfer", (req, res) => {
  const id_to_transfer = req.params.id_to_transfer;
  console.log("id_to_transfer:", id_to_transfer);

  // Define the SQL query to retrieve the employee record based on the provided ID
  const sql =
    "SELECT Employee_ID, First_name, Last_name, Job_Title, Dept_name, Pay_Grade FROM emp_view WHERE Employee_ID = ?";

  db.query(sql, [id_to_transfer], (err, result) => {
    if (err) {
      console.error("Error fetching employee data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.length > 0) {
        res.status(200).json(result[0]); // Return the first record (should be unique by ID)
      } else {
        res.status(404).json({ error: "Employee not found" });
      }
    }
  }); // Missing closing parenthesis
});

app.get("/fetchSupervisors", (req, res) => {
  const sql = "SELECT DISTINCT Supervisor_ID FROM supervisor";

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching supervisor data:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/supervisorReport/:id_to_transfer", (req, res) => {
  const id_to_transfer = req.params.id_to_transfer;
  const query =
    "SELECT employee_data.first_name as Subordinate_first_name, employee_data.last_name as Subordinate_last_name, supervisor.subordinate_id as Subordinate_ID FROM supervisor LEFT JOIN employee_data ON supervisor.subordinate_ID = employee_data.employee_id WHERE supervisor.Supervisor_ID = ?";
  db.query(query, [id_to_transfer], (error, results) => {
    if (error) {
      console.error("Error querying the database: " + error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

app.post("/addEmployee", async (req, res) => {
  const { employeeData, haveDependent } = req.body;

  try {
    const hashedPassword = await argon2.hash(employeeData.password);

    db.query(
      "CALL AddEmployee(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        employeeData.firstName,
        employeeData.lastName,
        employeeData.gender,
        employeeData.maritalStatus,
        employeeData.birthday,
        employeeData.email,
        employeeData.employmentStatus,
        employeeData.jobTitle,
        employeeData.payGrade,
        employeeData.branch,
        employeeData.department,
        haveDependent,
        employeeData.username,
        hashedPassword, // Store the hashed password
        JSON.stringify(employeeData.contact),
      ],
      (error, results, fields) => {
        if (error) {
          console.error("Error inserting employee data:", error);
          res.status(500).json({ message: "Employee data insertion failed" });
        } else {
          console.log("Employee data inserted successfully.");
          res
            .status(200)
            .json({ message: "Employee data inserted successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ message: "Password hashing failed" });
  }
});

app.post("/AddEmployee/AddDependent", (req, res) => {
  const sql =
    "INSERT INTO `Dependent_Information` (`First_name`, `Last_name`, `Gender`, `Age`, `Relation`) VALUES (?)";
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.gender,
    req.body.age,
    req.body.relation,
  ];

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Dependent Data Inserted.");
    }
  });
});

app.get("/addEmployee/employmentStatus", (req, res) => {
  const sql = "SELECT * FROM Employment_Status";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching employment statuses");
    } else {
      res.status(200).send(result);
    }
  });
});

app.get("/addEmployee/payGrade", (req, res) => {
  const sql = "SELECT Pay_Grade_ID, Pay_Grade FROM Pay_Grade";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching pay grades");
    } else {
      res.status(200).send(result);
    }
  });
});

app.get("/addEmployee/department", (req, res) => {
  const sql = "SELECT Dept_ID, Dept_Name FROM Department";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching departments");
    } else {
      res.status(200).send(result);
    }
  });
});

app.get("/addEmployee/branch", (req, res) => {
  const sql = "SELECT Branch_ID, Branch_Name FROM Branch";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching branches");
    } else {
      res.status(200).send(result);
    }
  });
});

app.get("/employeeDetailForHR/:id", (req, res) => {
  const employeeId = req.params.id;
  const empQuery = "SELECT * FROM Employee_Details WHERE Employee_ID = ?";
  const contactQuery =
    "SELECT * FROM Contact_Number_Details WHERE Employee_ID = ?";

  // Perform the employee details query
  db.query(empQuery, [employeeId], (err, employeeResult) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching employee details" });
    } else {
      // Perform the contact details query
      db.query(contactQuery, [employeeId], (err, contactResult) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Error fetching contact details" });
        }

        // Combine the results into a single response
        const output = { employee: employeeResult[0], contact: contactResult };

        // Send the response with the combined data
        res.status(200).json(output);
      });
    }
  });
});

app.post("/editEmployee", async (req, res) => {
  db.query(
    "CALL Update_Employee_Data(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      req.body.employeeID,
      req.body.firstName,
      req.body.lastName,
      req.body.gender,
      req.body.maritalStatus,
      req.body.birthday,
      req.body.email,
      req.body.jobTitle,
      req.body.payGrade,
      req.body.branch,
      req.body.department,
      req.body.employmentStatus,

      req.body.dependentID,
      req.body.dFirstName,
      req.body.dLastName,
      req.body.dGender,
      req.body.age,
      req.body.relation,

      JSON.stringify(req.body.contact), // You may need to stringify the JSON object
    ],
    (error, results, fields) => {
      if (error) {
        console.error("Error updating employee data:", error);
      } else {
        console.log("Employee data updated successfully.");
      }
    }
  );
});

app.get("/employeeData", (req, res) => {
  db.query("SELECT * FROM Employee_Data ORDER BY Timestamp", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/report4/employeesalaries/:minSalary/:maxSalary", (req, res) => {
  const minSalary = req.params.minSalary;
  const maxSalary = req.params.maxSalary;

  const query =
    "SELECT * FROM EmployeeSalaries WHERE Basic_Salary BETWEEN ? AND ?";

  db.query(query, [minSalary, maxSalary], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to retrieve data" });
    }

    res.json(results);
  });
});

app.get("/getPass", (req, res) => {
  db.query("SELECT * FROM password_check", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("We need a token, please give it to us next time!");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "You failed to authenticate" });
      } else {
        req.userId = decoded.id;
        req.jobTitle = decoded.jobTitle;
        next();
      }
    });
  }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.json({
    userID: req.userId,
    jobTitle: req.jobTitle,
    message: "User is authenticated",
  });
});

app.post("/authenticate", (req, res) => {
  const { User_ID, password } = req.body;
  if (User_ID == "Admin" && password == "Admin") {
    console.log("Admin login");

    const id = "Admin";
    const jobTitle = "Admin";

    const token = jwt.sign({ id, jobTitle }, "jwtSecret", {
      expiresIn: 3600, // means 60 minutes
    });

    res.json({ success: true, auth: true, token: token, is_admin: true });
  } else {
    // Fetch user data from the database
    const query = "SELECT * FROM password_check WHERE User_ID = ?";
    db.query(query, [User_ID], async (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        res.json({ success: false });
      } else {
        const user = results[0]; // Assuming User_ID is unique

        if (user) {
          try {
            const passwordsMatch = await argon2.verify(user.Password, password);

            if (passwordsMatch) {
              // Authentication successful
              // Generate a JWT token

              const id = user.Employee_ID;
              const jobTitle = user.Job_Title;
              const token = jwt.sign({ id, jobTitle }, "jwtSecret", {
                expiresIn: 3600, // means 60 minutes
              });

              res.json({ success: true, user, auth: true, token: token, is_admin: false });
            } else {
              // Authentication failed
              res.json({ success: false });
            }
          } catch (error) {
            console.error("Password verification error:", error);
            res.json({ success: false });
          }
        } else {
          // User not found
          res.json({ success: false });
        }
      }
    });
  }
});

// password changing
app.post("/changePassword/:id_to_transfer", async (req, res) => {
  const id_to_transfer = req.params.id_to_transfer;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  console.log("userId:", id_to_transfer);

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        "select password from employee_account where Employee_ID = ?",
        [id_to_transfer],
        (err, results) => {
          if (err) {
            console.log(err);
            reject("Internal server error");
          } else if (results.length === 0) {
            reject("User not found");
          } else {
            resolve(results[0].password);
          }
        }
      );
    });

    const storedPassword = results;
    console.log(
      "Received request to change password for userId:",
      id_to_transfer
    );
    console.log("Old password provided:", oldPassword);

    // Check the stored password
    console.log("Stored password:", storedPassword);

    const passwordsMatch = await argon2.verify(storedPassword, oldPassword);

    if (passwordsMatch) {
      const hashedPassword = await argon2.hash(newPassword);

      db.query(
        "update employee_account set password = ? where Employee_ID = ?",
        [hashedPassword, id_to_transfer],
        (err, updateResult) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Password update failed" });
          } else {
            res.status(200).json({ message: "Password changed successfully" });
          }
        }
      );
    } else {
      console.log("Old password is incorrect");
      res.status(401).json({ message: "Old password is incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Route to fetch leave requests
app.get("/leave_request", (req, res) => {
  const id = req.query.id_to_transfer;
  console.log("id:", id);
  const query = "SELECT * FROM supervisor_leave_accept where Supervisor_ID = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error fetching leave requests:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Route to update the status of a leave request
app.put("/leave_request/:leaveReqID", (req, res) => {
  const { leaveReqID } = req.params;
  const { status } = req.body;

  const query = "UPDATE leave_request SET Status = ? WHERE Leave_Req_ID = ?";
  db.query(query, [status, leaveReqID], (error, results) => {
    if (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Status updated successfully" });
    }
  });
});

app.get("/pendingLeaveRequests/:id_to_transfer", (req, res) => {
  const id_to_transfer = req.params.id_to_transfer; // Correctly access the parameter
  const query =
    "SELECT * FROM leave_request WHERE Employee_ID = ? and Status = 'Pending'";
  db.query(query, [id_to_transfer], (error, results) => {
    if (error) {
      console.error("Error fetching leave requests:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
});
app.get("/rejectedLeaveRequests/:id_to_transfer", (req, res) => {
  const id_to_transfer = req.params.id_to_transfer; // Correctly access the parameter
  const query =
    "SELECT * FROM leave_request WHERE Employee_ID = ? and Status = 'Rejected'";
  db.query(query, [id_to_transfer], (error, results) => {
    if (error) {
      console.error("Error fetching leave requests:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/fetchAllLeaves/:id_to_transfer", (req, res) => {
  const id_to_transfer = req.params.id_to_transfer; // Correctly access the parameter
  const query = "SELECT * FROM leave_count_gender WHERE Employee_ID = ?";
  db.query(query, [id_to_transfer], (error, results) => {
    if (error) {
      console.error("Error fetching leave limits:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/fetchtakenLeaves/:id_to_transfer", (req, res) => {
  const id_to_transfer = req.params.id_to_transfer; // Correctly access the parameter
  const query = "SELECT * FROM employee_leave_count WHERE Employee_ID = ?";
  db.query(query, [id_to_transfer], (error, results) => {
    if (error) {
      console.error("Error fetching leave limits:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.delete("/deleteLeaveRequest/:requestId", (req, res) => {
  const requestId = req.params.requestId;

  const query = "DELETE FROM leave_request WHERE Leave_Req_ID = ?";
  db.query(query, [requestId], (error, results) => {
    if (error) {
      console.error("Error deleting leave request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Request deleted successfully" });
    }
  });
});

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
app.get("/fetchLeaveRequestsDept", (req, res) => {
  const time = req.query.time; // Assuming the "time" variable is sent from the front end as a query parameter
  console.log("time:", time);
  let interval = ""; // Define an empty interval string

  if (time === "month") {
    interval = "1 MONTH";
  } else if (time === "year") {
    interval = "1 YEAR";
  } else {
    // Handle invalid or missing "time" parameter
    return res
      .status(400)
      .json({ error: "Invalid or missing 'time' parameter" });
  }

  const query = `SELECT * FROM leave_req_dept_2 WHERE start_date BETWEEN DATE_SUB(CURDATE(), INTERVAL ${interval}) AND CURDATE()`;

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

//Job Title report
app.get("/employee_data_Title_HRManager", (req, res) => {
  const query = "SELECT * FROM HRManagerEmployeeData";
  fetchEmployeeData(req, res, query);
});

app.get("/employee_data_Title_SoftwareEngineer", (req, res) => {
  const query = "SELECT * FROM SoftwareEngineerEmployeeData";
  fetchEmployeeData(req, res, query);
});
app.get("/employee_data_Title_Accountant", (req, res) => {
  const query = "SELECT * FROM AccountantEmployeeData";
  fetchEmployeeData(req, res, query);
});

app.get("/employee_data_Title_QA_Engineer", (req, res) => {
  const query = "SELECT * FROM QA_EngineerEmployeeData";
  fetchEmployeeData(req, res, query);
});

//Department report
// Route to fetch leave requests
app.get("/employee_data_FinanceDepartmentEmployeeData", (req, res) => {
  const query = "SELECT * FROM FinanceDepartmentEmployeeData";
  fetchEmployeeData(req, res, query);
});
app.get("/employee_data_HRDepartmentEmployeeData", (req, res) => {
  const query = "SELECT * FROM HRDepartmentEmployeeData";
  fetchEmployeeData(req, res, query);
});
app.get("/employee_data_AccountingDepartmentEmployeeData", (req, res) => {
  const query = "SELECT * FROM AccountingDepartmentEmployeeData";
  fetchEmployeeData(req, res, query);
});
app.get("/employee_data_EngineeringDepartmentEmployeeData", (req, res) => {
  const query = "SELECT * FROM EngineeringDepartmentEmployeeData";
  fetchEmployeeData(req, res, query);
});

// Route to get employee data for Pay Grade 1
app.get("/employee_data_pay_grade_1", (req, res) => {
  const query = "SELECT * FROM Pay_Grade_1_Employees";
  fetchEmployeeData(req, res, query);
});

// Route to get employee data for Pay Grade 2
app.get("/employee_data_pay_grade_2", (req, res) => {
  const query = "SELECT * FROM Pay_Grade_2_Employees";
  fetchEmployeeData(req, res, query);
});

// Route to get employee data for Pay Grade 3
app.get("/employee_data_pay_grade_3", (req, res) => {
  const query = "SELECT * FROM Pay_Grade_3_Employees";
  fetchEmployeeData(req, res, query);
});

// Route to get employee data for Pay Grade 4
app.get("/employee_data_pay_grade_4", (req, res) => {
  const query = "SELECT * FROM Pay_Grade_4_Employees";
  fetchEmployeeData(req, res, query);
});

// Route to get employee data for Pay Grade 4
app.get("/employee_data_pay_grade_5", (req, res) => {
  const query = "SELECT * FROM Pay_Grade_5_Employees";
  fetchEmployeeData(req, res, query);
});
// Route to get employee data for Pay Grade 4
app.get("/employee_data_pay_grade_6", (req, res) => {
  const query = "SELECT * FROM Pay_Grade_6_Employees";
  fetchEmployeeData(req, res, query);
});
// Route to get employee data for Pay Grade 4
app.get("/employee_data_pay_grade_7", (req, res) => {
  const query = "SELECT * FROM Pay_Grade_7_Employees";
  fetchEmployeeData(req, res, query);
});
// Route to get employee data for Pay Grade 4
app.get("/employee_data_pay_grade_8", (req, res) => {
  const query = "SELECT * FROM Pay_Grade_8_Employees";
  fetchEmployeeData(req, res, query);
});
// Route to get employee data for Pay Grade 4
app.get("/employee_data_pay_grade_9", (req, res) => {
  const query = "SELECT * FROM Pay_Grade_9_Employees";
  fetchEmployeeData(req, res, query);
});

// Route to get employee data for Pay Grade 4
app.get("/employee_data_pay_grade_10", (req, res) => {
  const query = "SELECT * FROM Pay_Grade_10_Employees";
  fetchEmployeeData(req, res, query);
});

//Branch route
// Route to fetch leave requests
app.get("/employee_data4", (req, res) => {
  const query = "SELECT * FROM EmployeeReportByBranch";
  fetchEmployeeData(req, res, query);
});

app.get("/employee_data_Branch_1", (req, res) => {
  const query = "SELECT * FROM EmployeeReportByBranch1";
  fetchEmployeeData(req, res, query);
});
app.get("/employee_data_Branch_2", (req, res) => {
  const query = "SELECT * FROM EmployeeReportByBranch2";
  fetchEmployeeData(req, res, query);
});
app.get("/employee_data_Branch_3", (req, res) => {
  const query = "SELECT * FROM EmployeeReportByBranch3";
  fetchEmployeeData(req, res, query);
});
app.get("/employee_data_Branch_4", (req, res) => {
  const query = "SELECT * FROM EmployeeReportByBranch4";
  fetchEmployeeData(req, res, query);
});
app.get("/employee_data_Branch_5", (req, res) => {
  const query = "SELECT * FROM EmployeeReportByBranch5";
  fetchEmployeeData(req, res, query);
});
app.get("/employee_data_Branch_6", (req, res) => {
  const query = "SELECT * FROM EmployeeReportByBranch6";
  fetchEmployeeData(req, res, query);
});
app.get("/employee_data_Branch_7", (req, res) => {
  const query = "SELECT * FROM EmployeeReportByBranch7";
  fetchEmployeeData(req, res, query);
});
app.get("/employee_data_Branch_8", (req, res) => {
  const query = "SELECT * FROM EmployeeReportByBranch8";
  fetchEmployeeData(req, res, query);
});

app.get("/employee_data_Branch_9", (req, res) => {
  const query = "SELECT * FROM EmployeeReportByBranch9";
  fetchEmployeeData(req, res, query);
});
app.get("/employee_data_Branch_10", (req, res) => {
  const query = "SELECT * FROM EmployeeReportByBranch10";
  fetchEmployeeData(req, res, query);
});

app.listen(3000, () => {
  console.log("Yey, your server is running on port 3000");
});
