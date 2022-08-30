"use strict";

import models, {NewExerciseLog, NewUser} from "../mongoDB/models.js";
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

const addNewExerciseLog = async (_id, description, duration, date, done) => {
    let username = "";
    
    try {
        const userExists = await models.NewUser.findById({ _id: _id});
        if (userExists === null) {
            return done("Error: user does not exists");
        } else {
            username = userExists.username;
        }
    } catch (err) {
        return done(err)
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
                let returnDataFormatted = {
                    username: username,
                    _id: _id,
                    description: data["_doc"].description,
                    duration: data["_doc"].duration,
                    date: data["_doc"].date,
                };
                done(null, returnDataFormatted);
            }
        })
    } else {
        return done("Error: data is invalid")
    }
}

const findAllUsers = async (done) => {
    try {
        const allUsers = await models.NewUser.find({});
        return done(null, allUsers);

    } catch (err) {
        return done("Error retrieving all users")
    }
}

// Exports
export {addNewUser, addNewExerciseLog, findAllUsers};
export default {addNewUser, addNewExerciseLog, findAllUsers};