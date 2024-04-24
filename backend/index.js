import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

//! Import Models
import { Book } from "./models/book.js";

//! Basic set up for Express Backend
//? Includes initializing that the app will use express

//! Connecting MongoDB / Mongoose db to the app
//? With express, you can 

const app = express();

app.get("/", (request, response) => {
    console.log(request)
    return response.status(201).send('Welcome to MERN Stack Tutorial')
});

// Middleware for parsing request body
app.use(express.json());

// Routes for Saving a new Book

app.post('/books', async (request, response) => {
    try {
        
        if (!request.body.title || 
            !request.body.author ||
            !request.body.yearPublished ||
            !request.body.summary) {
                return response.status(400).send({
                    message: 'Please submit all required fields: Title, Author, Year Published, and Summary.'
                })
            }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            yearPublished: request.body.yearPublished,
            summary: request.body.summary,
        }

        const createdBook = await Book.create(newBook);

        return response.status(201).send(createdBook)

    } catch (error) {
        console.log(error.message);
        response.status(500).send(
            { message: error.message }
        )
    }
})

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
