import express from "express";
import { PORT } from "./config.js";

//! Basic set up for Express Backend
const app = express();

app.listen(PORT, () => {
    console.log(`App is listening to port : ${PORT}`);
})

app.get("/", (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to MERN Stack Tutorial')
});

