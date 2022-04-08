"use strict";

import mongoose from "mongoose";
const { Schema } = mongoose;

// Schemas
const NewUserSchema = new Schema({
    username: {
        type: String,
        required: true
    }
})

// Models
const NewUser = mongoose.model("user", NewUserSchema)

// Exports
export { NewUser };
export default { NewUser };