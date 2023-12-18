const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const db = req.db; // Access the 'db' object from the request
    db.query("SELECT * FROM Custom_Attribute_Definition", (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error fetching custom attributes");
      } else {
        res.status(200).send(result);
      }
    });
});

router.post("/createCustomAttribute", (req, res) => {
    const db = req.db; // Access the 'db' object from the request
    const attributeName = req.body.attributeName;
  
    db.query(
      "INSERT INTO Custom_Attribute_Definition (Attribute_Name) VALUES (?)",
      [attributeName],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error creating custom attribute");
        } else {
          res.status(200).send("Custom attribute created successfully");
        }
      }
    );
});
  
router.post("/associateCustomAttribute", (req, res) => {
    const db = req.db; // Access the 'db' object from the request
    const { employeeID, attributeID, value } = req.body;

    // First, check if the provided Employee ID and Attribute ID exist in their respective tables.
    const checkQuery = "SELECT * FROM Employee_Data WHERE Employee_ID = ?";
    db.query(checkQuery, [employeeID], (error, results) => {
        if (error) {
        console.error("Error checking Employee Data:", error);
        return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length === 0) {
        return res.status(500).json({ message: "Employee ID does not exist" });
        }

        const attributeCheckQuery =
        "SELECT * FROM Custom_Attribute_Definition WHERE Attribute_ID = ?";
        db.query(
        attributeCheckQuery,
        [attributeID],
        (attributeError, attributeResults) => {
            if (attributeError) {
            console.error(
                "Error checking Custom Attribute Definition:",
                attributeError
            );
            return res.status(500).json({ message: "Internal server error" });
            }

            if (attributeResults.length === 0) {
            return res
                .status(500)
                .json({ message: "Attribute ID does not exist" });
            }

            // If both Employee ID and Attribute ID exist, proceed to insert into Employee_Custom_Attribute table.
            const insertQuery =
            "INSERT INTO Employee_Custom_Attribute (Attribute_ID, Employee_ID, Value) VALUES (?, ?, ?)";
            db.query(
            insertQuery,
            [attributeID, employeeID, value],
            (insertError) => {
                if (insertError) {
                console.error(
                    "Error inserting into Employee_Custom_Attribute:",
                    insertError
                );
                return res.status(500).json({ message: "Internal server error" });
                }

                return res.status(200).json({
                message: "Custom attribute added to the employee successfully",
                });
            }
            );
        }
        );
    });
});

module.exports = router;
