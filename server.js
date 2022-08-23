"use strict";
//temp del
import models, {NewExerciseLog} from "./mongoDB/models.js";
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

import Schema from 'mongoose';
import bodyParser from "body-parser";
import controllers from "./mongoDB/controllers.js";

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

app.post("/api/users", (req, res) => {
    console.log(req.body.username);
    controllers.addNewUser(req.body.username, (err, done) => {
        if (err) {
            console.error(err);
        } else {
            res.send(done);
        }
    });
});

app.post("/api/users/:_id/exercises", (req, res) => {
    // T03:24:00 
    const date = new Date(req.body.date)
    console.log(date.toDateString());
    controllers.addNewExerciseLog(req.params._id, req.body.description, req.body.duration, date.toDateString(), (err, done) => {
        if (err) {
            console.error(err);
            res.send(err);
        } else {
            res.send(done);
        }
    })
})

app.get("/api/users/:_id/logs", (req, res) => {
    //Example: https://stackoverflow.com/questions/17007997/how-to-access-the-get-parameters-after-in-express
    // https://www.digitalocean.com/community/tutorials/use-expressjs-to-get-url-and-post-parameters
    // http://localhost:3000/api/users/:_id/logs?test321=blablabla
    if (req.query.test321) {
        console.log("there")
    } else {
        console.log("not there")

    }
    console.log(req.query)
    console.log(req.params._id)
    console.log(req.query.test321)
    res.send("test ok")
})

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})