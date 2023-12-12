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

router.get("/employee_data", (req, res) => {
  const selectedReport = req.query.selectedReport;

  return new Promise((resolve, reject) => {
    db.query(
      "SELECT Employee_ID, CONCAT(First_Name, ' ', Last_Name) AS Full_Name, Gender, Birthday, Pay_Grade_ID FROM Employee_Data WHERE Branch_ID = ?;",
      [selectedReport],
      (err, result) => {
        if (err) {
          // console.log(err);
          reject(err);
        } else {
          // console.log("employee_data");
          //const result = JSON.stringify(result);
          // console.log(result);

          //resolve(result);
          res.status(200).json(result);
        }
      }
    );
  });
}),
  (module.exports = router);
