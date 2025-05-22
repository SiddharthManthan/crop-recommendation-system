const Express = require("express");
const { isPlantable, getDistrictWaterRequirement, getAllDistrictWaterRequirement, getRequirementChart } = require("../controllers/isPlantable.js");

const router = Express.Router();

router.post("/", isPlantable);
router.post("/districtWater/getDistrictWaterRequirement", getDistrictWaterRequirement);
router.get("/districtWater/getAllDistrictWaterRequirement", getAllDistrictWaterRequirement);
router.post("/districtWater/getRequirementChart", getRequirementChart);

module.exports = router;
