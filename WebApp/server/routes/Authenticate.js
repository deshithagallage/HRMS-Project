const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

router.post("/", (req, res) => {
    const db = req.db; // Access the 'db' object from the request
    const { User_ID, password } = req.body;
    if (User_ID == "Admin" && password == "Admin") {
        console.log("Admin login");

        const id = "Admin";
        const jobTitle = "Admin";

        const token = jwt.sign({ id, jobTitle }, "jwtSecret", {
        expiresIn: 3600, // means 60 minutes
        });

        res.json({ success: true, auth: true, token: token, is_admin: true });
    } else {
        // Fetch user data from the database
        const query = "SELECT * FROM password_check WHERE User_ID = ?";
        db.query(query, [User_ID], async (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            res.json({ success: false });
        } else {
            const user = results[0]; // Assuming User_ID is unique

            if (user) {
            try {
                const passwordsMatch = await argon2.verify(user.Password, password);

                if (passwordsMatch) {
                // Authentication successful
                // Generate a JWT token

                const id = user.Employee_ID;
                const jobTitle = user.Job_Title;
                const token = jwt.sign({ id, jobTitle }, "jwtSecret", {
                    expiresIn: 3600, // means 60 minutes
                });

                res.json({
                    success: true,
                    user,
                    auth: true,
                    token: token,
                    is_admin: false,
                });
                } else {
                // Authentication failed
                res.json({ success: false });
                }
            } catch (error) {
                console.error("Password verification error:", error);
                res.json({ success: false });
            }
            } else {
            // User not found
            res.json({ success: false });
            }
        }
        });
    }
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
  
    if (!token) {
      res.send("We need a token, please give it to us next time!");
    } else {
      jwt.verify(token, "jwtSecret", (err, decoded) => {
        if (err) {
          res.json({ auth: false, message: "You failed to authenticate" });
        } else {
          req.userId = decoded.id;
          req.jobTitle = decoded.jobTitle;
          next();
        }
      });
    }
};
  
router.get("/isUserAuth", verifyJWT, (req, res) => {
    res.json({
        userID: req.userId,
        jobTitle: req.jobTitle,
        message: "User is authenticated",
    });
});

module.exports = router;
