const { db } = require("../database.js");

const isPlantable = async (req, res) => {
    let { districtId, cropId, area, plantDate } = req.body;
    if (!plantDate) {
        plantDate = new Date();
    }
    let crop, district;

    try {
        district = await db.district.findUnique({
            where: {
                id: parseInt(districtId),
            },
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }

    try {
        crop = await db.crop.findUnique({
            where: {
                id: parseInt(cropId),
            },
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }

    let canPlant,
        exceedAmountPerDay = 0;
    let { requiredWater, requireWaterPerDay } = calculateWaterForCrop(area, crop.waterRequirement, crop.cropDuration);
    let { districtWaterConsumedPerDay, districtWaterConsumedTotal } = await calculateDistrictRequirement(districtId, new Date(plantDate));
    // Magic Number : 30 means the water available today will be used within 30 days, // TODO: Make this configurable from admin panel
    let districtWaterAvailablePerDay = (district.storage * 1000000000) / 30 - districtWaterConsumedPerDay;
    if (districtWaterAvailablePerDay < requireWaterPerDay) {
        canPlant = false;
        exceedAmountPerDay = requireWaterPerDay - districtWaterAvailablePerDay;
    } else {
        canPlant = true;
    }

    res.status(200).json({ districtWaterConsumedPerDay, districtWaterConsumedTotal, requiredWater, requireWaterPerDay, districtWaterAvailablePerDay, canPlant, exceedAmountPerDay });
};

const getDistrictWaterRequirement = async (req, res) => {
    let requirements = await calculateDistrictRequirement(req.body.districtId, new Date());
    return res.status(200).json(requirements);
};

const getRequirementChart = async (req, res) => {
    let date = new Date();
    let data = { days: [], requiredWater: [] };
    let requirementPerDay;
    for (let i = 0; i < req.body.days; i++) {
        data.days.push(date);
        requirementPerDay = await calculateDistrictRequirement(req.body.districtId, date);
        data.requiredWater.push(requirementPerDay.districtWaterConsumedPerDay);
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    }
    return res.status(200).json(data);
};

const calculateAllDistrictWaterRequirement = async () => {
    let districtRequirements = [];
    let districts;
    try {
        districts = await db.district.findMany();
    } catch (e) {
        console.log(e);
    }
    let requirements, data;
    for (let district of districts) {
        requirements = await calculateDistrictRequirement(district.id, new Date());
        let { districtWaterConsumedPerDay } = requirements;
        let { id, name, storage } = district;
        let data = {
            id,
            name,
            storage,
            districtWaterConsumedPerDay,
            daysTillExhaustion: (storage * 1000000000) / districtWaterConsumedPerDay,
        };
        if (data.daysTillExhaustion == Infinity || data.daysTillExhaustion == NaN || data.daysTillExhaustion == null || data.daysTillExhaustion < 1) {
            data.daysTillExhaustion = "-";
        }
        districtRequirements.push(data);
    }
    return districtRequirements;
};

const getAllDistrictWaterRequirement = async (req, res) => {
    let districtWaterRequirement = await calculateAllDistrictWaterRequirement();
    return res.status(200).json(districtWaterRequirement);
};

const calculateWaterForCrop = (area, waterRequirement, duration) => {
    // Area in m^2, Water Requirement in mm, duration in days. Return in litres
    let requiredWater = area * (waterRequirement / 1000) * 1000;
    let requireWaterPerDay = requiredWater / duration;

    return {
        requiredWater,
        requireWaterPerDay,
    };
};

const calculateDistrictRequirement = async (districtId, date) => {
    // Date Format : YYYY-MM-DD
    let farms = await db.farm.findMany({
        where: {
            districtId: parseInt(districtId),
            planted: true,
            plantedDate: {
                lte: new Date(date),
            },
        },
        include: {
            crop: true,
        },
    });

    districtWaterConsumedPerDay = 0;
    districtWaterConsumedTotal = 0;
    farms.forEach((farm) => {
        let plantedDate = new Date(farm.plantedDate);
        let removalDate = new Date();
        removalDate.setDate(plantedDate.getDate() + farm.crop.cropDuration);
        let plantationStartDay = new Date(date);
        if (removalDate > plantationStartDay) {
            let { requiredWater, requireWaterPerDay } = calculateWaterForCrop(farm.area, farm.crop.waterRequirement, farm.crop.cropDuration);
            districtWaterConsumedPerDay += requireWaterPerDay;
            districtWaterConsumedTotal += requiredWater;
        }
    });

    return { date, districtWaterConsumedPerDay, districtWaterConsumedTotal };
};

module.exports = { isPlantable, getDistrictWaterRequirement, getAllDistrictWaterRequirement, getRequirementChart, calculateAllDistrictWaterRequirement };
