require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db("plateshare_db");

    // Create collections
    const foodsCollection = db.collection("foods");
    const requestsCollection = db.collection("requests");

    // Insert one test food document
    const sampleFood = {
      food_name: "Homemade Vegetable Soup",
      food_image: "https://i.ibb.co/2dqCFbM/vegetable-soup.jpg",
      food_quantity: "Serves 4 people",
      pickup_location: "Maple Street Community Center, London",
      expire_date: "2025-11-12",
      additional_notes: "Kept refrigerated, freshly made this morning.",
      food_status: "available",
      donator_name: "Alice Green",
      donator_email: "alice@gmail.com",
      donator_image: "https://i.ibb.co/6mM6n7k/alice.jpg",
    };

    const result = await foodsCollection.insertOne(sampleFood);
    console.log("Food inserted with ID:", result.insertedId);

    console.log("Connected to plateshare_db");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("PlateShare backend is running");
});

app.listen(port, () => console.log(`Server running on port ${port}`));