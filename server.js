"use strict";
//temp del
import models, {NewExerciseLog, NewUser} from "./mongoDB/models.js";
//Temp del

import express from "express";

const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
});

import bodyParser from "body-parser";
import controllers from "./mongoDB/controllers.js";

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

app.post("/api/users", (req, res) => {
    controllers.addNewUser(req.body.username, (err, done) => {
        if (err) {
            console.error(err);
        } else {
            res.send(done);
        }
    });
});

app.get("/api/users", (req, res) => {
    controllers.findAllUsers((err, done) => {
        if (err) {
            res.send(err);
        } else {
            res.send(done);
        }
    })
});

app.post("/api/users/:_id/exercises", (req, res) => {
    controllers.addNewExerciseLog(req.params._id, req.body.description, req.body.duration, req.body.date, (err, done) => {
        if (err) {
            res.send(err);
        } else {
            res.send(done);
        }
    })
})

app.get("/api/users/:_id/logs", (req, res) => {
    controllers.getUserLogs(req.params._id, req.query.from, req.query.to, req.query.limit, (err, done) => {
        if (err) {
            res.send(err);
        } else {
            res.send(done);
        }
    })
})

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})