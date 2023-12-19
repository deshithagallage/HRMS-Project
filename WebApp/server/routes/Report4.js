const express = require("express");
const router = express.Router();

router.get("/employeesalaries/:minSalary/:maxSalary", (req, res) => {
  const db = req.db; // Access the 'db' object from the request
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

module.exports = router;
