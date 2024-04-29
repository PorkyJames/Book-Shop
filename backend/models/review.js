import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        reviewText: {
            type: String,
            required: true,
        },
        starRating: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

export const Review = mongoose.model('Review', reviewSchema)
