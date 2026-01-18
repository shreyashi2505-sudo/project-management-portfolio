const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/save-feedback", (req, res) => {
  const data = req.body;

  const entry = `
Name: ${data.name}
Email: ${data.email}
Rating: ${data.rating}
Message: ${data.message}
-----------------------
`;

  fs.appendFile("feedback.txt", entry, err => {
    if (err) return res.status(500).send("Error saving feedback");
    res.send("Saved");
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
