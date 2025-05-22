const { db } = require("../database.js");
const { calculateAllDistrictWaterRequirement } = require("./isPlantable.js");

const calculate_exhaustion = async () => {
    let exhaustion = await calculateAllDistrictWaterRequirement();
    exhaustion.forEach(async (district) => {
        if (district.daysTillExhaustion === "-") {
            district.daysTillExhaustion = 0;
        }

        // TODO: Make exhaustion days configurable
        let WATER_STORED_DAYS = 45;
        if (district.daysTillExhaustion <= WATER_STORED_DAYS && district.daysTillExhaustion != 0) {
            // Water will exhaust soon
            // Check if notification exists
            let notification;
            try {
                notification = await db.notification.findFirst({
                    where: {
                        districtId: parseInt(district.id),
                    },
                });
            } catch (e) {
                console.log(e);
            }
            if (notification != null) {
                // Notification exists, check if data is same, else notify
                if (parseInt(district.daysTillExhaustion) != notification.daysTillExhaustion) {
                    await db.notification.update({
                        where: {
                            id: parseInt(notification.id),
                        },
                        data: {
                            daysTillExhaustion: district.daysTillExhaustion,
                            dismissed: false,
                        },
                    });
                }
            } else {
                // Notification does not exist, create it
                await db.notification.create({
                    data: {
                        districtId: district.id,
                        daysTillExhaustion: district.daysTillExhaustion,
                        userType: 0,
                    },
                });
            }
        }
    });
};

const get_pending_notifications = async (req, res) => {
    // TODO: Use nodejs background tasks to generate notifications
    await calculate_exhaustion();
    try {
        let notifications = await db.notification.findMany();
        let districts = await db.district.findMany();

        notifications.forEach((notification) => {
            districts.forEach((district) => {
                if (district.id == notification.districtId) {
                    notification.districtName = district.name;
                }
            });
        });

        return res.status(200).json(notifications);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

const dismiss_notification = async (req, res) => {
    const { notificationId } = req.body;
    try {
        let notification = await db.notification.update({
            where: {
                id: parseInt(notificationId),
            },
            data: {
                dismissed: true,
            },
        });
        return res.status(200).json(notification);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

module.exports = { get_pending_notifications, dismiss_notification };
