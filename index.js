import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import createUser from "./controllers/createUser.js";

dotenv.config();
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
const app = express();
app.use(express.json());
connectDB(mongoURI);
app.post("/signup", createUser);

app.listen(port, () => console.log("server up!"));
