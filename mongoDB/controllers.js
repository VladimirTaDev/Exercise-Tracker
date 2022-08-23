"use strict";

import models, {NewExerciseLog} from "../mongoDB/models.js";
import mongoose from "mongoose";

const addNewUser = (username, done) => {
    if (username !== "") {
        const newUser = new models.NewUser({
            username: username
        });

        newUser.save((err, data) => {
            if (err) {
                return done(err);
            } else {
                done(null, data);
            }
        });
    } else {
        return done("Nick is empty")
    }
};

const addNewExerciseLog = async(_id, description, duration, date, done) => {
    try {
        const userExists = await models.NewUser.exists({ _id: _id});
        //if (userExists) { console.log("userExists")}
    } catch (err) {
        return done("User does not exists")
    }
    
    if (description !== "" && duration !== undefined && date !== undefined) {
        const userId = mongoose.Types.ObjectId(_id);
        const newExerciseLog = new models.NewExerciseLog({
            userId: userId,
            description: description,
            duration: duration,
            date: date
        });

        newExerciseLog.save((err, data) => {
            if (err) {
                return done(err);
            } else {
                done(null, data);
            }
        })
    } else {
        return done("Data is invalid")
    }
}

// Exports
export {addNewUser, addNewExerciseLog};
export default {addNewUser, addNewExerciseLog};