const express = require("express");
const connectDB = require("../db/connection");
const { ObjectId } = require("mongodb");

const router = express.Router();

// Get all available foods
router.get("/", async (req, res) => {
  try {
    const db = await connectDB();
    const foods = await db
      .collection("foods")
      .find({ food_status: "available" })
      .toArray();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch foods" });
  }
});

// Add new food
router.post("/", async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection("foods").insertOne(req.body);
    res.json({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Failed to add food" });
  }
});

// Get single food by ID
router.get("/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const food = await db
      .collection("foods")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!food) return res.status(404).json({ error: "Food not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch food" });
  }
});

// Update food
router.put("/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db
      .collection("foods")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
    res.json({ modifiedCount: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: "Failed to update food" });
  }
});

// Delete food
router.delete("/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db
      .collection("foods")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete food" });
  }
});

module.exports = router;