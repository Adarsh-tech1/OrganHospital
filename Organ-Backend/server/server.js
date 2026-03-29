import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "../routes/authRoutes.js";
import donorRoutes from "../routes/donorRoutes.js";
import requestRoutes from "../routes/requestRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/request", requestRoutes);

app.listen(port, () => console.log(`Server running on ${port}`));
