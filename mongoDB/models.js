"use strict";

import mongoose from "mongoose";

const {Schema} = mongoose;

// Schemas
const NewUserSchema = new Schema({
    username: {
        type: String,
        required: true
    }
})
const NewExerciseLogSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    dateMilliseconds: {
        type: Number,
        required: true
    }
})


// Models
const NewUser = mongoose.model("user", NewUserSchema)
const NewExerciseLog = mongoose.model("exerciseLog", NewExerciseLogSchema);

// Exports
export {NewUser, NewExerciseLog};
export default {NewUser, NewExerciseLog};