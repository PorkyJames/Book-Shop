import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

//! Import Models
import { Book } from "./models/book.js";

//! Basic set up for Express Backend
//? Includes initializing that the app will use express

//! Connecting MongoDB / Mongoose db to the app
//? With express, you can create the routes and connect to MongoDB / Mongoose. 

const app = express();

app.get("/", (request, response) => {
    console.log(request)
    return response.status(201).send('Welcome to MERN Stack Tutorial')
});

// Middleware for parsing request body
app.use(express.json());

//* Routes for Saving a new Book

//! Create a Book Route
app.post('/books', async (request, response) => {
    try {
        //! If the request body's title, author, year published and summary do not exist, send a message.
        if (!request.body.title || 
            !request.body.author ||
            !request.body.yearPublished ||
            !request.body.summary) {
                return response.status(400).send({
                    message: 'Please submit all required fields: Title, Author, Year Published, and Summary.'
                })
            }
        //! Otherwise, create a new book with the request body's title, author, year published, and summary
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            yearPublished: request.body.yearPublished,
            summary: request.body.summary,
        }

        //! Then with that info, we create a new book
        const createdBook = await Book.create(newBook);

        //! Then we return the response with a status of 201 with that createdBook
        return response.status(201).send(createdBook)

    } catch (error) {
        console.log(error.message);
        response.status(500).send(
            { message: error.message }
        )
    }
})

//! Get all Books
app.get('/books', async(request, response) => {
    try {
        const books = await Book.find()

        return response.status(200).send({
            count: books.length,
            data: books
        })

    } catch(error) {
        console.log(error.message);
        response.status(500).send({
            message: error.message
        })
    }
})

//! Get book by ID
app.get('/books/:bookId', async (request, response) => {
    try {
        //! Our ID is whatever is listed in our parameters of our URL
        const { bookId } = request.params;

        //! Then our book that we have we'll throw into a variable and find it using findById
        const book = await Book.findById(bookId)

        //! Then we can just return the book to the client
        return response.status(200).send(book)

    } catch (error) {
        console.log(error.message)
        response.status(500).send({
            message: error.message
        })
    }
})


//! Connect to the Mongoose Database
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
