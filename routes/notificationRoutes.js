const { Router } = require("express");
const notificationController = require("../controllers/notificationController");

const router = Router();

router.get("/getPendingNotifications", notificationController.get_pending_notifications);
router.post("/dismissNotification", notificationController.dismiss_notification);

module.exports = router;
