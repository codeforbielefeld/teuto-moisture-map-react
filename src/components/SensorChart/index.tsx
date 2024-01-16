import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip,
    Legend,
    ChartData,
    LineController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { SensorDetails, SensorInfo } from "../../model/models";
import useSensorDetails from "../../hooks/useSensorDetails";
import { mergeStyleSets } from "@fluentui/react";
import { useContext } from "react";
import { HistoryWindow, HistoryWindowContext } from "../../App";

// ChartJS setup
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, LineController);

const recentDaysChartOptions = {
    responsive: true,
    interaction: {
        mode: "index" as const,
        intersect: false,
    },
    plugins: {
        legend: {
            position: "top" as const,
            labels: {
                boxWidth: 20,
                boxHeight: 1,
            },
        },
    },
    maintainAspectRatio: false,
    scales: {
        moisture: {
            type: "linear" as const,
            display: true,
            position: "left" as const,
            ticks: {
                callback: (value: any, index: any, ticks: any) => value + " %",
            },
            suggestMin: 0,
            suggestMax: 50,
        },
        // precipitation: {
        //     type: 'linear' as const,
        //     display: true,
        //     position: 'right' as const,
        //     suggestedMax: 10,
        //     grid: {
        //         drawOnChartArea: false,
        //     },
        //     ticks: {
        //         callback: (value: any, index: any, ticks: any) => (value + " mm")
        //     }
        // },
    },
};

function extractRecentDaysDataset(
    details: SensorDetails,
    hourly: boolean,
): ChartData<"bar" | "line", (number | undefined)[], string> {
    const colors = {
        red: "rgb(255, 99, 132)",
        orange: "rgb(255, 159, 64)",
        yellow: "rgb(255, 205, 86)",
        green: "rgb(75, 192, 192)",
        blue: "rgb(54, 162, 235)",
        purple: "rgb(153, 102, 255)",
        grey: "rgb(201, 203, 207)",
    };
    return {
        labels: details.moistureMeasurements.map((d) => {
            if (hourly) return d.timestamp.toLocaleTimeString();
            else return d.timestamp.toLocaleDateString();
        }),
        datasets: [
            {
                label: "Tageswert",
                type: "line",
                data: details.moistureMeasurements.map((d) => d.sensor),
                borderColor: colors.green,
                backgroundColor: colors.green,
                yAxisID: "moisture",
            },
            {
                label: "Globales Mittel",
                type: "line",
                data: details.moistureMeasurements.map((d) => d.peers),
                borderColor: colors.grey,
                backgroundColor: colors.grey,
                yAxisID: "moisture",
            },
        ],
    };
}

const style = mergeStyleSets({
    message: {
        textAlign: "center",
        width: "100%",
    },
});

export default function SensorChart({ sensorInfo }: { sensorInfo: SensorInfo }) {
    const { historyWindow } = useContext(HistoryWindowContext);
    const hourly = historyWindow === HistoryWindow.hourly;
    const { details, loading } = useSensorDetails(sensorInfo);
    if (details)
        return <Chart type="line" options={recentDaysChartOptions} data={extractRecentDaysDataset(details, hourly)} />;
    else if (loading) return <div className={style.message}>lade Verlauf</div>;
    return <div className={style.message}>Fehler beim Laden :(</div>;
}
