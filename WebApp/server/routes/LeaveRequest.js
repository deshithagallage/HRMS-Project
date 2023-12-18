const express = require("express");
const router = express.Router();

// Route to fetch leave requests
router.get("/", (req, res) => {
    const db = req.db; // Access the 'db' object from the request
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
router.put("/:leaveReqID", (req, res) => {
    const db = req.db; // Access the 'db' object from the request
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

router.get("/pendingLeaveRequests/:id_to_transfer", (req, res) => {
    const db = req.db; // Access the 'db' object from the request
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

router.get("/fetchAllLeaves/:id_to_transfer", (req, res) => {
    const db = req.db; // Access the 'db' object from the request
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

router.get("/fetchtakenLeaves/:id_to_transfer", (req, res) => {
    const db = req.db; // Access the 'db' object from the request
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

router.get("/rejectedLeaveRequests/:id_to_transfer", (req, res) => {
    const db = req.db; // Access the 'db' object from the request
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

router.post("/createLeaveReq", (req, res) => {
    const db = req.db; // Access the 'db' object from the request
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

router.delete("/deleteLeaveRequest/:requestId", (req, res) => {
    const db = req.db; // Access the 'db' object from the request
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

module.exports = router;