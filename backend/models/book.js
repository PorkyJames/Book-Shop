import mongoose from "mongoose"


const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        yearPublished: {
            type: Number,
            required: true,
        },
        summary: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

//! Establish that the book variable will be a model that has a name property which
//! identifies as a string.
//? Note, that after the "Book" name of the model, you can create the schema that way, but you can easily 
//? change it to a variable prior and just replace it with the variable that has a schema. 

//* Old
// export const Book = mongoose.model('Book', { name: String })

//* New
export const Book = mongoose.model('Book', bookSchema)
