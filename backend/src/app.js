require("dotenv").config(); 
const express = require("express");
require("./db"); // just call the file (auto connects)

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(8080, () => console.log("Server started on port 8080"));