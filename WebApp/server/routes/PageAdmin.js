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

module.exports = router;
