const express = require("express");
const router = express.Router();

const mysql = require("mysql");

require("dotenv").config();

const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

router.get("/employeeDetailForHR/:id", (req, res) => {
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

module.exports = router;
