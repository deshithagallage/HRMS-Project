const express = require("express");
const router = express.Router();
const argon2 = require("argon2");

router.post("/", async (req, res) => {
    const db = req.db; // Access the 'db' object from the request
    const { employeeData, haveDependent } = req.body;
  
    try {
      const hashedPassword = await argon2.hash(employeeData.password);
  
      db.query(
        "CALL AddEmployee(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          employeeData.firstName,
          employeeData.lastName,
          employeeData.gender,
          employeeData.maritalStatus,
          employeeData.birthday,
          employeeData.email,
          employeeData.employmentStatus,
          employeeData.jobTitle,
          employeeData.payGrade,
          employeeData.branch,
          employeeData.department,
          haveDependent,
          employeeData.username,
          hashedPassword, // Store the hashed password
          JSON.stringify(employeeData.contact),
        ],
        (error, results, fields) => {
          if (error) {
            console.error("Error inserting employee data:", error);
            res.status(500).json({ message: "Employee data insertion failed" });
          } else {
            console.log("Employee data inserted successfully.");
            res
              .status(200)
              .json({ message: "Employee data inserted successfully" });
          }
        }
      );
    } catch (error) {
      console.error("Error hashing password:", error);
      res.status(500).json({ message: "Password hashing failed" });
    }
});

router.post("/AddDependent", (req, res) => {
    const db = req.db; // Access the 'db' object from the request
    const sql =
      "INSERT INTO `Dependent_Information` (`First_name`, `Last_name`, `Gender`, `Age`, `Relation`) VALUES (?)";
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.gender,
      req.body.age,
      req.body.relation,
    ];
  
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Dependent Data Inserted.");
      }
    });
});

router.get("/employmentStatus", (req, res) => {
    const db = req.db; // Access the 'db' object from the request
    const sql = "SELECT * FROM Employment_Status";
  
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error fetching employment statuses");
      } else {
        res.status(200).send(result);
      }
    });
});

router.get("/payGrade", (req, res) => {
    const db = req.db; // Access the 'db' object from the request
    const sql = "SELECT Pay_Grade_ID, Pay_Grade FROM Pay_Grade";
  
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error fetching pay grades");
      } else {
        res.status(200).send(result);
      }
    });
});

router.get("/department", (req, res) => {
    const db = req.db; // Access the 'db' object from the request
    const sql = "SELECT Dept_ID, Dept_Name FROM Department";
  
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error fetching departments");
      } else {
        res.status(200).send(result);
      }
    });
});

router.get("/branch", (req, res) => {
    const db = req.db; // Access the 'db' object from the request
    const sql = "SELECT Branch_ID, Branch_Name FROM Branch";
  
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error fetching branches");
      } else {
        res.status(200).send(result);
      }
    });
});

module.exports = router;
