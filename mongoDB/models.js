"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schemas
const NewUserSchema = new Schema({
    username: {
        type: String,
        required: true
    }
})

// Models
//const NewUser = mongoose.model("user", NewUserSchema)

// Exports
module.exports.NewUser = mongoose.model("user", NewUserSchema);

// export { NewUser }; --Not working?
// Exports.
//module.exports = {
   // NewUser
//};