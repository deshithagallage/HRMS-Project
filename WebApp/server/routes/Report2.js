const express = require("express");
const router = express.Router();

router.get("/employee_data", (req, res) => {
  const db = req.db; // Access the 'db' object from the request
  const selectedReport = req.query.selectedReport;

  return new Promise((resolve, reject) => {
    if (selectedReport === "Nothing Selected") {
      query = "SELECT Employee_ID, CONCAT(First_Name, ' ', Last_Name) AS Full_Name, Gender, Birthday, Pay_Grade_ID FROM Employee_Data;"
    } else {
      query = "SELECT Employee_ID, CONCAT(First_Name, ' ', Last_Name) AS Full_Name, Gender, Birthday, Pay_Grade_ID FROM Employee_Data WHERE Branch_ID = ?;"
    }
    db.query(
      query,
      [selectedReport],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          res.status(200).json(result);
        }
      }
    );
  });
});

module.exports = router;
