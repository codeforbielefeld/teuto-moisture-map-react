import useFetch from "use-http";
import { SensorDetails, SensorInfo } from "../model/models";
import { useContext } from "react";
import { HistoryWindowContext } from "../App";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface SensorDetailsDto {
    sensor: Array<{
        moisture: number;
        time: string;
    }>;
    peers: Array<{
        moisture: number;
        time: string;
    }>;
}

function processData(sensorInfo: SensorInfo, data: SensorDetailsDto): SensorDetails {
    function toDate(timestamp: string): Date {
        return new Date(/\+|Z/i.test(timestamp) ? timestamp : timestamp + "Z");
    }
    function processMeasurement({ moisture, time }: { moisture: number; time: string }): {
        moisture: number;
        timestamp: Date;
    } {
        return { moisture, timestamp: toDate(time) };
    }

    const sensorMeasurements = data.sensor.map(processMeasurement);
    const peerMeasurements = data.peers.map(processMeasurement);
    const allMeasurements = new Map<number, { timestamp: Date; sensor?: number; peers?: number }>();
    sensorMeasurements.forEach(({ timestamp, moisture }) => {
        allMeasurements.set(timestamp.getTime(), { timestamp, sensor: moisture });
    });

    peerMeasurements.forEach(({ timestamp, moisture }) => {
        const existing = allMeasurements.get(timestamp.getTime());
        if (existing) {
            existing.peers = moisture;
        } else {
            allMeasurements.set(timestamp.getTime(), { timestamp, peers: moisture });
        }
    });

    const moistureMeasurements = [...allMeasurements.values()];
    moistureMeasurements.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    return {
        info: sensorInfo,
        moistureMeasurements,
    };
}

interface SensorDetailsState {
    loading: Boolean;
    error: Error | undefined;
    details: SensorDetails | undefined;
}

export default function useSensorDetails(sensorInfo: SensorInfo): SensorDetailsState {
    const { historyWindow } = useContext(HistoryWindowContext);
    const url = `${BACKEND_URL}/sensorData/${sensorInfo.device}?records=7&resolution=${historyWindow}`;

    const fetchResult = useFetch<SensorDetailsDto>(url, [sensorInfo]);
    const { loading, error, data: dto } = fetchResult;

    const details = !error && dto ? processData(sensorInfo, dto) : undefined;

    return { loading, error, details };
}
