const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

router.get("/getAllUsers", userController.get_all_users);
router.post("/deleteUser", userController.delete_user);

module.exports = router;
