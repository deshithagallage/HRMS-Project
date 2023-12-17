const express = require("express");
const router = express.Router();

router.get("/customAttributes", (req, res) => {
  const db = req.db; // Access the 'db' object from the request
  db.query("SELECT * FROM Custom_Attribute_Definition", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching custom attributes");
    } else {
      res.status(200).send(result);
    }
  });
});

// Fetch employee data with custom fields from the database
router.get("/employeeCustomAttributes", (req, res) => {
  const db = req.db; // Access the 'db' object from the request
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

module.exports = router;
