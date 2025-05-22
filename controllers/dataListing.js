const { db } = require("../database.js");

const getCrops = async (req, res) => {
    if (req.query.id) {
        try {
            let crops = await db.crop.findUnique({
                where: {
                    id: parseInt(req.query.id),
                },
            });
            return res.status(200).json(crops);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    } else {
        try {
            let crops = await db.crop.findMany();
            return res.status(200).json(crops);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    }
};

const getDistricts = async (req, res) => {
    if (req.query.id) {
        try {
            let districts = await db.district.findUnique({
                where: {
                    id: parseInt(req.query.id),
                },
            });
            return res.status(200).json(districts);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    } else {
        try {
            let districts = await db.district.findMany();
            return res.status(200).json(districts);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    }
};

const getCropMaturity = async (req, res) => {
    try {
        let farms = await db.farm.findMany({
            include: {
                crop: true,
                district: true,
            },
        });
        let data = [];
        let current_farm;
        farms.forEach((farm) => {
            let plantedDate = new Date(farm.plantedDate);
            let removalDate = new Date();
            removalDate.setDate(plantedDate.getDate() + farm.crop.cropDuration);
            current_farm = { id: farm.id, removalDate, area: farm.area, crop: farm.crop.cropName, district: farm.district.name };
            data.push(current_farm);
        });
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

const getCropYield = async (req, res) => {
    try {
        let yield = {};
        keys = [];

        // Create Keys
        let crops = await db.crop.findMany();
        crops.forEach((crop) => {
            yield[crop.cropName] = 0;
            keys.push(crop.cropName);
        });

        // Calculate Data
        let farms = await db.farm.findMany({
            include: {
                crop: true,
                district: true,
            },
        });
        farms.forEach((farm) => {
            yield[farm.crop.cropName] = yield[farm.crop.cropName] + farm.plantedArea;
        });

        return res.status(200).json({ keys, yield });
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

module.exports = { getCrops, getDistricts, getCropMaturity, getCropYield };
