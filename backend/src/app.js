require("dotenv").config(); 
const express = require("express");
const helemet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const productsRoutes = require("./routes/productsRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const cors = require("cors");
const sequelize = require("./db");
const app = express();
app.use(express.json());
sequelize.sync({ alter: true })
app.use(cors("*"));
app.use(helemet())  
app.get("/", (req, res) => {
  res.send("Welcome to StockFlow");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products",productsRoutes);
app.use("/api/dashboard",dashboardRoutes );

app.listen(8080, () => console.log("Server started on port 8080"));