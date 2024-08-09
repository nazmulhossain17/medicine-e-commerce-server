import mongoose from "mongoose";
import app from "./app";

// Load environment variables using require
require("dotenv").config();

const connectDB = async () => {
  try {
    const dbURL = process.env.DB_URL;
    const port = process.env.PORT || 3000; // Default to port 3000 if not defined

    if (!dbURL) {
      throw new Error("Database URL is not defined");
    }

    await mongoose.connect(dbURL);
    console.log("Database Connected!");

    app.listen(port, () => {
      console.log(`Server running on PORT ${port}`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
  }
};

connectDB();
