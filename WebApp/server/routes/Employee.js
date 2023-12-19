const express = require("express");
const router = express.Router();

router.get("/employeeData", (req, res) => {
  const db = req.db; // Access the 'db' object from the request
  db.query("SELECT * FROM Employee_Data ORDER BY Timestamp", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.get("/fetchSupervisors", (req, res) => {
  const db = req.db; // Access the 'db' object from the request
  const sql = "SELECT DISTINCT Supervisor_ID FROM supervisor";

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching supervisor data:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

module.exports = router;