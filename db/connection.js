// db/connection.js
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectDB() {
  if (db) return db; // reuse existing connection
  try {
    await client.connect();
    db = client.db("plateshare_db");
    console.log("✅ Connected to MongoDB (plateshare_db)");
    return db;
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    throw err;
  }
}

module.exports = connectDB;