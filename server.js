"use strict";

import express from "express";
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
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
  console.log(__dirname + "Qsdfdssf")
  res.sendFile(__dirname + '/views/index.html')
});

app.post("/api/users", (req, res) => {
  console.log(req.body.username);
  controllers.addNewUser(req.body.username, (err, done) => {
    if(err) {
      console.error(err);
    } else {
      res.send(done);
    }
  });
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})