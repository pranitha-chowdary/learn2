// config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("\x1b[32m%s\x1b[0m", `✅ MongoDB Connected: ${conn.connection.host}`);

    // ✅ This is what you're still missing
    console.log("\x1b[36m%s\x1b[0m", `✅ Connected to DB: ${conn.connection.name}`);

  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};
