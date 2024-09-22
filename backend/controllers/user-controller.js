const jwt = require('jsonwebtoken');
const User = require("../models/user");

require('dotenv').config();
const jwtSecret = process.env.SECRET;

const createUser = (req, res, next) => {
    const {username, email, password, userType, skillSet} = req.body;

    try {
        User.findOne({
            $or: [
                {username: username}, {email: email}
            ]
        })
        .then((data) => {
            if(data) {
                res.send({
                        userExist: true
                })
            } else {
                User.create({
                    username,
                    email,
                    password,
                    skillSet,
                    userType,
                })
                .then((data) => {
                    res.send(data);
                })
            }
        })
        
    } catch (err) {
        console.error(err);

        res.status(401).json({
            message: "Some error occured",
            error: err
        })
    }
}

const getUser = (req, res, next) => {

    const username = req.query.username;

    try {
        User.findOne({
           username
        })
        .then((data) => {
            if(data) {
                res.send(data);
            } else {
                res.send({
                    userExist: false
                })
            }
        })

    } catch (err) {
        console.error(err);

        res.status(401).json({
            message: "Some error occured",
            error: err
        })
    }
}

const findUser = (req, res, next) => {

    const username = req.query.username;

    try {
        User.findOne({
           username
        })
        .then((data) => {
            if(data) {
                res.status(201).json({
                    userExist: true,
                    username: data.username,
                    message: "Successfully fetched user",
                })
            } else {
                res.status(403).json({
                    userExist: false,
                    message: "User does not exist"
                })
            }
        })

    } catch (err) {
        console.error(err);

        res.status(401).json({
            message: "Some error occured",
            error: err
        })
    }
}

const isAvaliable = (req, res, next) => {
    try {
        
    } catch (err) {
        console.error(err);

        res.status(401).json({
            message: "Some error occured",
            error: err
        })
    }
}



module.exports = {
    createUser,
    getUser,
    findUser
}