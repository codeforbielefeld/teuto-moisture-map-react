import useFetch from "use-http";
import { SensorDetails, SensorInfo } from "../model/models";
import { useContext } from "react";
import { HistoryWindow, HistoryWindowContext } from "../App";

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

function numRecords(historyWindow: HistoryWindow): number {
    switch (historyWindow) {
        case HistoryWindow.hourly:
            return 24;
        case HistoryWindow.daily:
            return 7;
        case HistoryWindow.weekly:
            return 8;
        case HistoryWindow.monthly:
            return 12;
    }
    return 7;
}

export default function useSensorDetails(sensorInfo: SensorInfo): SensorDetailsState {
    const { historyWindow } = useContext(HistoryWindowContext);

    const url = `${BACKEND_URL}/sensorData/${sensorInfo.device}?records=${numRecords(historyWindow)}&resolution=${historyWindow}`;

    const fetchResult = useFetch<SensorDetailsDto>(url, [sensorInfo]);
    const { loading, error, data: dto } = fetchResult;

    const details = !error && dto ? processData(sensorInfo, dto) : undefined;

    return { loading, error, details };
}
