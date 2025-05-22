const { db } = require("../database.js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const get_farm = async (req, res) => {
    if (req.body.farmId) {
        try {
            let farms = await db.farm.findUnique({
                where: {
                    id: parseInt(req.body.farmId),
                },
            });
            //TODO: Make sure user is authorized to request the farm data via jwt
            return res.status(200).json(farms);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    } else if (req.body.userId) {
        try {
            let farms = await db.farm.findMany({
                where: {
                    userId: req.body.userId,
                },
            });
            //TODO: Make sure user is authorized to request the farm data via jwt
            return res.status(200).json(farms);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    } else {
        return res.status(400).json("Specify farmId or userId");
    }
};

const get_all_farms = async (req, res) => {
    // Todo: Check whether user is admin or not before listing all farms
    try {
        let farms = await db.farm.findMany();
        return res.status(200).json(farms);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

const add_farm = async (req, res) => {
    const { districtId, area, plantedDate, plantedArea, cropId } = req.body;
    let data, userId;
    // Get User
    const token = req.cookies.jwt;
    jwt.verify(token, process.env.JWTSECRET, async (err, decodedToken) => {
        if (!err) {
            let user = await User.findById(decodedToken.id);
            userId = user._id.toString();
            if (plantedDate) {
                data = {
                    districtId: parseInt(districtId),
                    area: parseInt(area),
                    userId,
                    planted: true,
                    plantedArea: parseInt(area),
                    plantedDate: new Date(plantedDate),
                    cropId: parseInt(cropId),
                };
            } else {
                data = {
                    districtId: parseInt(districtId),
                    area: parseInt(area),
                    userId,
                };
            }

            try {
                let farm = await db.farm.create({ data });
                return res.status(200).json(farm);
            } catch (e) {
                console.log(e);
                return res.status(500).json(e);
            }
        } else {
            console.log(err);
            return res.status(500).json(e);
        }
    });
    console.log("Error has occurred");
};

const edit_farm = async (req, res) => {
    //TODO: Finish Edit Farm. How to check what keys have been modified ?
    console.log(req.body);
    const { farmId } = req.body;
    try {
        let farm = await db.farm.update({
            where: {
                id: parseInt(farmId),
            },
            data: {
                name: "Viola the Magnificent",
            },
        });
        return res.status(200).json(farm);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

const remove_farm = async (req, res) => {
    // TODO: Check if logged in user is actually allowed to delete the farm
    const { farmId } = req.body;
    try {
        let farm = await db.farm.delete({
            where: {
                id: parseInt(farmId),
            },
        });
        return res.status(200).json(farm);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

const get_all_users = async (req, res) => {
    // Todo: Check whether user is admin or not before listing all farms
    try {
        let users = await db.user.findMany();
        return res.status(200).json(users);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

module.exports = { get_farm, get_all_farms, add_farm, edit_farm, remove_farm, get_all_users };
