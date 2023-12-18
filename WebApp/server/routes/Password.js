const express = require("express");
const router = express.Router();
const argon2 = require("argon2");

router.get("/getPass", (req, res) => {
    const db = req.db; // Access the 'db' object from the request
    db.query("SELECT * FROM password_check", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

// password changing
router.post("/changePassword/:id_to_transfer", async (req, res) => {
    const db = req.db; // Access the 'db' object from the request
    const id_to_transfer = req.params.id_to_transfer;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    console.log("userId:", id_to_transfer);
  
    try {
      const results = await new Promise((resolve, reject) => {
        db.query(
          "select password from employee_account where Employee_ID = ?",
          [id_to_transfer],
          (err, results) => {
            if (err) {
              console.log(err);
              reject("Internal server error");
            } else if (results.length === 0) {
              reject("User not found");
            } else {
              resolve(results[0].password);
            }
          }
        );
      });
  
      const storedPassword = results;
      console.log(
        "Received request to change password for userId:",
        id_to_transfer
      );
      console.log("Old password provided:", oldPassword);
  
      // Check the stored password
      console.log("Stored password:", storedPassword);
  
      const passwordsMatch = await argon2.verify(storedPassword, oldPassword);
  
      if (passwordsMatch) {
        const hashedPassword = await argon2.hash(newPassword);
  
        db.query(
          "update employee_account set password = ? where Employee_ID = ?",
          [hashedPassword, id_to_transfer],
          (err, updateResult) => {
            if (err) {
              console.log(err);
              res.status(500).json({ message: "Password update failed" });
            } else {
              res.status(200).json({ message: "Password changed successfully" });
            }
          }
        );
      } else {
        console.log("Old password is incorrect");
        res.status(401).json({ message: "Old password is incorrect" });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
});

module.exports = router;