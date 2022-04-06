"use strict";

const models = require("../mongoDB/models");

const addNewUserAsync = async (req, res, next) => {
    
};

const addNewUser = (username, done) => {
    if (username !== "") {
        const newUser = new models.NewUser({
            username: username
        });
        
        console.log(newUser + "  --urnnm4546/*/*/")
        
        newUser.save((err, data) => {
            if(err) {
                return done(err);
            } else {
                done(null, data);
            }
        });
    } else {
        return done("Nick is empty")
    }
};

// export { addNewUser } --Not working?
// Exports.
module.exports = {
    addNewUser
};