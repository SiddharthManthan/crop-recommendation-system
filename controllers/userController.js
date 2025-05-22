const { db } = require("../database.js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const get_all_users = async (req, res) => {
    // Todo: Check whether user is admin or not before listing all farms
    try {
        let users = await User.find();
        return res.status(200).json(users);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

const delete_user = async (req, res) => {
    // Todo: Check whether user is admin or not before listing all farms
    try {
        let deleted = await User.deleteOne({ _id: req.body.userId });
        if (deleted) {
            return res.status(200).json({ status: "success" });
        } else {
            return res.status(500).json({ status: "failed" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

module.exports = { get_all_users, delete_user };
