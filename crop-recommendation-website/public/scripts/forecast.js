async function getDistricts() {
    const response = await fetch("/api/data/districts");
    const districts = await response.json();
    return districts;
}

const getChartData = async () => {
    // const data = {
    //     districtId: districtSelect.value,
    //     days: document.getElementById("daysSelect").value,
    // };

    const data = {
        districtId: 1,
        days: 7,
    };

    try {
        let response = await fetch("/api/isPlantable/districtWater/getRequirementChart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const chartData = await response.json();

        response = await fetch("/api/isPlantable/districtWater/getAllDistrictWaterRequirement");
        const districts = await getDistricts();

        let districtWater;
        districts.forEach((district) => {
            if (district.id == data.districtId) {
                districtWater = district.storage * 1000000000;
            }
        });

        chartData.districtWater = [];
        let index = 0;
        chartData.days.forEach(() => {
            chartData.districtWater.push(districtWater);
            districtWater = districtWater - chartData.requiredWater[index++];
        });

        return chartData;
    } catch (error) {
        console.error("Error:", error);
    }
};

const getMainChartOptions = async () => {
    let mainChartColors = {};

    if (document.documentElement.classList.contains("dark")) {
        mainChartColors = {
            borderColor: "#374151",
            labelColor: "#9CA3AF",
            opacityFrom: 0,
            opacityTo: 0.15,
        };
    } else {
        mainChartColors = {
            borderColor: "#F3F4F6",
            labelColor: "#6B7280",
            opacityFrom: 0.45,
            opacityTo: 0,
        };
    }

    let chartData = await getChartData();
    console.log(chartData);

    return {
        chart: {
            height: 420,
            type: "area",
            fontFamily: "Inter, sans-serif",
            foreColor: mainChartColors.labelColor,
            toolbar: {
                show: false,
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                enabled: true,
                opacityFrom: mainChartColors.opacityFrom,
                opacityTo: mainChartColors.opacityTo,
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            style: {
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
            },
        },
        grid: {
            show: true,
            borderColor: mainChartColors.borderColor,
            strokeDashArray: 1,
            padding: {
                left: 35,
                bottom: 15,
            },
        },
        series: [
            {
                name: "Water Available",
                data: chartData.districtWater,
                color: "#1A56DB",
            },
            {
                name: "Water Required",
                data: chartData.requiredWater,
                color: "#FDBA8C",
            },
        ],
        markers: {
            size: 5,
            strokeColors: "#ffffff",
            hover: {
                size: undefined,
                sizeOffset: 3,
            },
        },
        xaxis: {
            categories: chartData.days,
            labels: {
                style: {
                    colors: [mainChartColors.labelColor],
                    fontSize: "14px",
                    fontWeight: 500,
                },
                formatter: function (value) {
                    return new Date(value).toLocaleDateString("en-US", { day: "numeric", month: "short" });
                },
            },
            axisBorder: {
                color: mainChartColors.borderColor,
            },
            axisTicks: {
                color: mainChartColors.borderColor,
            },
            crosshairs: {
                show: true,
                position: "back",
                stroke: {
                    color: mainChartColors.borderColor,
                    width: 1,
                    dashArray: 10,
                },
            },
        },
        yaxis: [
            {
                title: {
                    text: "Available Water",
                },
                labels: {
                    style: {
                        colors: [mainChartColors.labelColor],
                        fontSize: "14px",
                        fontWeight: 500,
                    },
                    formatter: function (value) {
                        return value.toFixed(2);
                    },
                },
            },
            {
                opposite: true,
                title: {
                    text: "Required Water",
                },
                labels: {
                    style: {
                        colors: [mainChartColors.labelColor],
                        fontSize: "14px",
                        fontWeight: 500,
                    },
                    formatter: function (value) {
                        return value.toFixed(2);
                    },
                },
            },
        ],
        legend: {
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "Inter, sans-serif",
            labels: {
                colors: [mainChartColors.labelColor],
            },
            itemMargin: {
                horizontal: 10,
            },
        },
        responsive: [
            {
                breakpoint: 1024,
                options: {
                    xaxis: {
                        labels: {
                            show: false,
                        },
                    },
                },
            },
        ],
    };
};

async function printChart() {
    let chartOptions = await getMainChartOptions();
    if (document.getElementById("line-chart-prediction")) {
        const chart = new ApexCharts(document.getElementById("line-chart-prediction"), chartOptions);
        chart.render();

        // init again when toggling dark mode
        document.addEventListener("dark-mode", function () {
            chart.updateOptions(chartOptions);
        });
    }
}

printChart();
