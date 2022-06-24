import { FontWeights, getTheme, mergeStyleSets, Text } from "@fluentui/react";
import { SensorDetails, SensorInfo } from '../../model/models';
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
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import useSensorDetails from "../../hooks/useSensorDetails";

// Styles
const theme = getTheme();
const styles = mergeStyleSets({
    header: {
        padding: '12px 18px 12px',
    },
    title: [
        theme.fonts.xLarge,
        {
            margin: 0,
            fontWeight: FontWeights.semilight,
        },
    ],
    inner: {
        height: '100%',
        padding: '0 18px 15px',
    },
    subtext: [
        theme.fonts.small,
        {
            margin: 0,
            fontWeight: FontWeights.semilight,
        },
    ],
    link: [
        theme.fonts.medium,
        {
            color: theme.palette.neutralPrimary,
        },
    ]
});


// chart.js setup
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip,
    Legend
);


const recentDaysChartOptions = {
    responsive: true,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    plugins: {
        legend: {
            position: 'top' as const,
            labels: {
                boxWidth: 20,
                boxHeight: 1
            }
        }
    },
    scales: {
        moisture: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
            ticks: {
                callback: (value: any, index: any, ticks: any) => (value + " %")
            }
        },
        precipitation: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            suggestedMax: 10,
            grid: {
                drawOnChartArea: false,
            },
            ticks: {
                callback: (value: any, index: any, ticks: any) => (value + " mm")
            }
        },
    }
};

function extractRecentDaysDataset(details: SensorDetails): ChartData<"bar"|"line", number[], string> {
    const colors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };
    return {
        labels: details.recentDays.map(d => d.date.toLocaleDateString()),
        datasets: [
            {
                label: "Tageswert",
                type: "line",
                data: details.recentDays.map(d => d.percent),
                borderColor: colors.green,
                backgroundColor: colors.green,
                yAxisID: "moisture"
            },
            {
                label: "Vorjahr",
                type: "line",
                data: details.recentDays.map(d => d.previousYears),
                borderColor: colors.purple,
                backgroundColor: colors.purple,
                yAxisID: "moisture"
            },
            {
                label: "Umgebungsmittel",
                type: "line",
                data: details.recentDays.map(d => d.peers),
                borderColor: colors.grey,
                backgroundColor: colors.grey,
                yAxisID: "moisture"
            },
            {
                label: "Niederschlag",
                type: "bar",
                data: details.recentDays.map(d => d.precipitation),
                borderColor: colors.blue,
                backgroundColor: colors.blue,
                yAxisID: "precipitation"
            }
        ]
    }
}

const SensorTooltip = ({ record }: { record: SensorInfo }) => {
    const details = useSensorDetails(record.device)
    return <>
        <div className={styles.header}>
            <Text className={styles.title}>
                Feuchte: {record.percent} %
            </Text>
        </div>
        <div className={styles.inner}>
            <Text className={styles.subtext}>
                Letzte Aktualisierung: {record.timestamp.toLocaleString()}
            </Text>
            <Chart type='bar' options={recentDaysChartOptions} data={extractRecentDaysDataset(details)} />
        </div>
    </>
}

export default SensorTooltip