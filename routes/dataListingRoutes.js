const Express = require("express");
const { getCrops, getDistricts, getCropMaturity, getCropYield } = require("../controllers/dataListing.js");

const router = Express.Router();

router.get("/crops", getCrops);
router.get("/districts", getDistricts);
router.get("/getCropMaturity", getCropMaturity);
router.get("/getCropYield", getCropYield);

module.exports = router;
