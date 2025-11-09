require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connection");
const foodsRouter = require("./routes/foods");
const requestsRouter = require("./routes/requests");


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/foods", foodsRouter);
app.use("/api/requests", requestsRouter);



// Base route
app.get("/", (req, res) => {
  res.send("PlateShare backend is running ✅");
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(port, () =>
      console.log(`🚀 Server running on http://localhost:${port}`)
    );
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });