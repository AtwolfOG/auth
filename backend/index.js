import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import apiRouter from "./routes/router.js";

dotenv.config();
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.REQUEST_URL, credentials: true }));
app.use(cookieParser());
connectDB(mongoURI);
app.use("/api", apiRouter);

app.listen(port, () => console.log("server up!"));
