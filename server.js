"use strict";

// import express from "express"; --- Cannot use?
const express = require('express');
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
});

const { Schema } = require('mongoose')
const bodyParser = require("body-parser")
const mongoDbControllers = require("./mongoDB/controllers");

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post("/api/users", (req, res) => {
  console.log(req.body.username);
  mongoDbControllers.addNewUser(req.body.username, (err, done) => {
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
