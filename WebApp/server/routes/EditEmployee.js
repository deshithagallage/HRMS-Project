const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    const db = req.db; // Access the 'db' object from the request
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
  

module.exports = router;