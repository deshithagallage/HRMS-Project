const express = require("express");
const router = express.Router();

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

router.get("/supervisorReport/:id_to_transfer", (req, res) => {
  const db = req.db; // Access the 'db' object from the request
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

module.exports = router;
