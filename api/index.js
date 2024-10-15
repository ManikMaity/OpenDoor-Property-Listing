import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import z from "zod";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({msg : "Hello from API!"});
});


app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});