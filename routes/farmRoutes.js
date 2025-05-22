const { Router } = require("express");
const farmController = require("../controllers/farmController");

const router = Router();

router.get("/getFarm", farmController.get_farm);
router.get("/getAllFarms", farmController.get_all_farms);
router.post("/addFarm", farmController.add_farm);
router.post("/editFarm", farmController.edit_farm);
router.post("/removeFarm", farmController.remove_farm);

module.exports = router;
