const express = require("express");
const connectDB = require("../db/connection");
const { ObjectId } = require("mongodb");

const router = express.Router();

// Create new food request
router.post("/", async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection("requests").insertOne({
      ...req.body,
      status: "pending",
      createdAt: new Date(),
    });
    res.json({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Failed to create request" });
  }
});

// Get requests for a specific food (visible to owner)
router.get("/food/:foodId", async (req, res) => {
  try {
    const db = await connectDB();
    const requests = await db
      .collection("requests")
      .find({ foodId: req.params.foodId })
      .toArray();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: "Failed to get requests" });
  }
});

// Accept/Reject a request
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body; // expected: "accepted" or "rejected"
    const db = await connectDB();

    const result = await db
      .collection("requests")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { status } }
      );

    // if accepted, mark food as donated
    if (status === "accepted") {
      const request = await db
        .collection("requests")
        .findOne({ _id: new ObjectId(req.params.id) });
      await db
        .collection("foods")
        .updateOne(
          { _id: new ObjectId(request.foodId) },
          { $set: { food_status: "donated" } }
        );
    }

    res.json({ modifiedCount: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: "Failed to update request" });
  }
});



// Get all requests made by a specific user
router.get("/user/:email", async (req, res) => {
  try {
    const db = await connectDB();
    const userRequests = await db
      .collection("requests")
      .find({ userEmail: req.params.email })
      .toArray();
    res.json(userRequests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user's requests" });
  }
});

module.exports = router;