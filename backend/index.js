import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

//! Basic set up for Express Backend
//? Includes initializing that the app will use express

//! Connecting MongoDB / Mongoose db to the app
//? With express, you can 

const app = express();

app.get("/", (request, response) => {
    console.log(request)
    return response.status(201).send('Welcome to MERN Stack Tutorial')
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to Database')
        app.listen(PORT, () => {
            console.log(`App is listening to port : ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error)
    })
