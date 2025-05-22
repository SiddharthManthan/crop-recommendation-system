const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getDistrictId = async (districtName) => {
    try {
        let district = await prisma.district.findMany({
            where: {
                name: {
                    contains: districtName
                }
            }
        });
        return district[0].id
    } catch (e) {
        console.log(e);
    }
}
 
async function generateFarmData() {
    // Generate Random data for farms
    // Ensure users farmer 1 with id 65256b77b4c4d64e11be9807 and farmer 2 with id 65256b83b4c4d64e11be9809 exist
    let cropId=1;
    let farmSize=10800;

    let date = new Date("2023-10-10T18:39:28.525Z");

    // For Ahmadabad adjust numbers to show deficiency 
    let districtId=await getDistrictId("Ahmadabad")
    for(let i=0; i<=10; i++) {
        await prisma.farm.create({
            data: {
                userId:"65256b77b4c4d64e11be9807",
                area:farmSize,
                planted:true,
                plantedArea:farmSize,
                plantedDate:date.toISOString(),
                district: {
                    connect: {
                        id: districtId
                    }
                },
                crop: {
                    connect: {
                        id: cropId
                    }
                }
            },
        });
        cropId=(cropId%7)+1
        date.setDate(date.getDate() - 1);
    }

    // For Narmada adjust numbers to show excess 
    districtId=await getDistrictId("Narmada")
    date = new Date();
    for(let i=0; i<=10; i++) {
        await prisma.farm.create({
            data: {
                userId:"65256b77b4c4d64e11be9807",
                area:farmSize,
                planted:true,
                plantedArea:farmSize,
                plantedDate:date.toISOString(),
                district: {
                    connect: {
                        id: districtId
                    }
                },
                crop: {
                    connect: {
                        id: cropId
                    }
                }
            },
        });
        cropId=(cropId%7)+1
        date.setDate(date.getDate() - 1);
    }
}

generateFarmData();