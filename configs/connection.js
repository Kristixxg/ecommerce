import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { MONGO_URI } = process.env;
mongoose.connect(MONGO_URI);

export const db = mongoose.connection;
