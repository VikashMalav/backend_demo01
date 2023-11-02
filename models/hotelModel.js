import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },

    address: {
        type: String,
        required: true,

    },
    rating: {
        type: String,
        required: true,
        default: 1,
        enum: [1, 2, 3, 4, 5]
    },
    category: {
        type: String,
        required: true,

    }

}, { timestamps: true })

export const Hotel = mongoose.model("hotel",hotelSchema)