import mongoose from "mongoose";
import { DB_STRING_MONGO } from "./var.js";


export async function connectDB() {
    await mongoose.connect(DB_STRING_MONGO)
    console.log("Database connected");
}

