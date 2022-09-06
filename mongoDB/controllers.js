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
    let userExists = null;

    try {
        userExists = await models.NewUser.findById({_id: _id});
    } catch (err) {
        return done(err)
    }

    let dateX = new Date();
    if (/^\d/.test(date)) {
        dateX = date;
    }

    if (description !== "" && duration !== undefined && userExists !== null) {
        const userId = mongoose.Types.ObjectId(_id);
        const dateFormatted = new Date(dateX);

        const newExerciseLog = new models.NewExerciseLog({
            userId: userId,
            description: description,
            duration: duration,
            date: dateFormatted.toDateString(),
            dateMilliseconds: dateFormatted.getTime()
        });

        newExerciseLog.save((err, data) => {
            if (err) {
                return done(err);
            } else {
                const returnDataFormatted = {
                    username: userExists.username,
                    _id: _id,
                    description: data["_doc"].description,
                    duration: data["_doc"].duration,
                    date: data["_doc"].date,
                };
                done(null, returnDataFormatted);
            }
        })
    } else {
        return done("Error: data is invalid or user does not exist")
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

const getUserLogs = async (_id, from, to, limit, done) => {
    let username = "";
    let userExists = null;
    let exerciseLogs = null;
    let queryParamsExist = false;
    let limitLogsTo = 0; // 0 = no limit.
    let logsFromMilliseconds = new Date("1800-01-01").getTime();
    let logsToMilliseconds = new Date().getTime();
    const regExpDate = /^[\d+\-]+$/;
    const regExpDigit = /^[\d+]+$/;
    if (from !== undefined && regExpDate.test(from)) {
        logsFromMilliseconds = new Date(from).getTime();
        queryParamsExist = true;
    }
    if (to !== undefined && regExpDate.test(to)) {
        logsToMilliseconds = new Date(to).getTime();
        queryParamsExist = true;
    }
    if (limit !== undefined && regExpDigit.test(limit)) {
        limitLogsTo = limit;
        queryParamsExist = true;
    }
    
    try {
        userExists = await models.NewUser.findById({_id: _id});
        username = userExists.username;
    } catch (err) {
        return done(err)
    }
    try {
        if (queryParamsExist) {
            exerciseLogs = await models.NewExerciseLog.find({userId: _id, dateMilliseconds: { $gte: logsFromMilliseconds, $lte: logsToMilliseconds }}).limit(limitLogsTo);
        } else {
            exerciseLogs = await models.NewExerciseLog.find({userId: _id});
        }
    } catch (err) {
        return done(err)
    }

    if (userExists === null && exerciseLogs === null) {
        return done("Error: user does not exists or unable to retrieve exercise logs");
    } else {
        const returnDataFormatted = {
            username: username,
            _id: _id,
            count: exerciseLogs.length,
            log: exerciseLogs
        }

        done(null, returnDataFormatted);
    }
};

// Exports
export {addNewUser, addNewExerciseLog, findAllUsers, getUserLogs};
export default {addNewUser, addNewExerciseLog, findAllUsers, getUserLogs};