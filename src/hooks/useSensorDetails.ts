import useFetch from "use-http";
import { MoistureMeasurement, SensorDetails, SensorInfo } from "../model/models";

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
    function processMeasurement({ moisture, time }: { moisture: number; time: string }): MoistureMeasurement {
        return { moisture, timestamp: toDate(time) };
    }

    const measurements = data.sensor.map(processMeasurement);
    const peerMeasurements = data.peers.map(processMeasurement);

    return {
        measurements,
        peerMeasurements,
        info: sensorInfo,
    };
}

interface SensorDetailsState {
    loading: Boolean;
    error: Error | undefined;
    details: SensorDetails | undefined;
}

export default function useSensorDetails(sensorInfo: SensorInfo): SensorDetailsState {
    const url = `${BACKEND_URL}/sensorData/${sensorInfo.device}?records=7&resolution=1d`;

    const fetchResult = useFetch<SensorDetailsDto>(url, [sensorInfo]);
    const { loading, error, data: dto } = fetchResult;

    const details = !error && dto ? processData(sensorInfo, dto) : undefined;

    return { loading, error, details };
}
