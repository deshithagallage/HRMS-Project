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

router.get("/report4/employeesalaries/:minSalary/:maxSalary", (req, res) => {
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
