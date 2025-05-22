const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const { parse } = require("csv-parse");
const moment=require("moment");

const prisma = new PrismaClient();

function importStates() {
    fs.createReadStream(`./sampledata/states.csv`)
        .pipe(parse({ delimiter: ","}))
        .on("data", async function (row) {
            await prisma.state.create({
                data: {
                    id: 0,
                    name: row[0],
                },
            });
            importData();
        })
        .on("error", function (error) {
            console.log(error.message);
        });
}

function importAvailableWater(item) {
    fs.createReadStream(`./sampledata/water-resources/${item}`)
        .pipe(parse({ delimiter: ","}))
        .on("data", async function (row) {
            await prisma.district.create({
                data: {
                    name: row[0],
                    storage: row[2],
                    state: {
                        connect: {
                            id: 0
                        }
                    }
                },
            });
        })
        .on("error", function (error) {
            console.log(error.message);
        });
}

function importCropWaterRequirement(item) {
    fs.createReadStream(`./sampledata/water-requirement/${item}`)
        .pipe(parse({ delimiter: ","}))
        .on("data", async function (row) {
            // Set state to 0 as we are only importing gujarat data
            await prisma.crop.create({
                data: {
                    cropName: row[0],
                    cropDuration: parseInt(row[1]),
                    waterRequirement: parseInt(row[2]),
                    numberOfIrrigation: parseInt(row[3]),
                },
            });
        })
        .on("error", function (error) {
            console.log(error.message);
        });
}

function importData() {
    let files = fs.readdirSync("sampledata/water-resources");
    files.forEach(importAvailableWater);
    files = fs.readdirSync("sampledata/water-requirement");
    files.forEach(importCropWaterRequirement);
}

// Import states calls import data
importStates();
