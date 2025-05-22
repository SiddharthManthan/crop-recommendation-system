async function getCropYield() {
    const response = await fetch("/api/data/getCropYield");
    let data = await response.json();
    return data;
}

const getChartOptions = async () => {
    let data = await getCropYield();
    let yield = data.yield;
    let series = [];
    let labels = [];
    data.keys.forEach((key) => {
        if (yield[key] != 0) {
            labels.push(key);
            series.push(yield[key]);
        }
    });
    return {
        series,
        //colors: ["#1C64F2", "#16BDCA", "#9061F9"],
        chart: {
            height: 420,
            width: "100%",
            type: "pie",
        },
        stroke: {
            colors: ["white"],
            lineCap: "",
        },
        plotOptions: {
            pie: {
                labels: {
                    show: true,
                },
                size: "100%",
                dataLabels: {
                    offset: -25,
                },
            },
        },
        labels,
        dataLabels: {
            enabled: true,
            style: {
                fontFamily: "Inter, sans-serif",
            },
        },
        legend: {
            position: "bottom",
            fontFamily: "Inter, sans-serif",
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value;
                },
            },
        },
        xaxis: {
            labels: {
                formatter: function (value) {
                    return value;
                },
            },
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
        },
    };
};

async function printChart() {
    let chartOptions = await getChartOptions();
    if (document.getElementById("pie-chart") && typeof ApexCharts !== "undefined") {
        const chart = new ApexCharts(document.getElementById("pie-chart"), chartOptions);
        chart.render();
    }
}

printChart();
