import mongoose from "mongoose";

const userSchema  =new mongoose.Schema({

    name:{
        type:String,
        required:[true,"name is required "]
    },
    email:{
        type:String,
        required:[true,"email is required "],
        // unique:true
    },
    password:{
        type:String,
        required:[true,"password is required "],
        min:[8,"min password length is 8"]
    },

},{timestamps:true})

export const User = mongoose.model("User",userSchema)