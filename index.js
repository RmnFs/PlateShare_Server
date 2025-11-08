require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connection");
const foodsRouter = require("./routes/foods");


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/foods", foodsRouter);

// Base route
app.get("/", (req, res) => {
  res.send("PlateShare backend is running ✅");
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