import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import { connect } from "mongoose";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send("Hello world!!");
});

app.use("/api/auth", authRoutes);



app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server running on port ${PORT}`)
});
