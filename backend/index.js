// let express = require('express')

import express from "express";
import mongoose from "mongoose";
import { PORT, dbURL } from "./config.js";
import cors from "cors";
import studentRoute from "./routes/studentsRoutes.js";


let app = express()
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello I am from Server");
});

app.use("/students", studentRoute);


mongoose
    .connect(dbURL)
    .then(() => {
        console.log("DB CONNECTED SUCCESSFULLY");

        app.listen(PORT, () => {
            console.log(`Server started in PORT  ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("error");
    });