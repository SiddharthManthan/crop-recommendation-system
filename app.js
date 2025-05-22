const express = require("express");
const dataListingRoutes = require("./routes/dataListingRoutes.js");
const isPlantable = require("./routes/isPlantableRoutes.js");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes.js");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware.js");
const farmRoutes = require("./routes/farmRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const notificationRoutes = require("./routes/notificationRoutes.js");

const app = express();
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const connectToDatabase = () => {
    mongoose
        .connect(process.env.DBURI)
        .then((result) => app.listen(process.env.JWTAUTHPORT))
        .catch((err) => {
            console.log(err);
            setTimeout(connectToDatabase, 5000);
        });
};

connectToDatabase();

// Unprotected routes
app.use("/authentication", express.static("./crop-recommendation-website/public/authentication"));
app.use("/static", express.static("./crop-recommendation-website/public/static"));
app.get("*", requireAuth);

app.use(express.static("./crop-recommendation-website/public"));
app.get("*", checkUser);
app.use(authRoutes);
app.use("/api/data", requireAuth, dataListingRoutes);
app.use("/api/isplantable", requireAuth, isPlantable);
app.use("/api/farm", requireAuth, farmRoutes);
app.use("/api/user", requireAuth, userRoutes);
app.use("/api/notification", requireAuth, notificationRoutes);
