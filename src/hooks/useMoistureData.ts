import { MoistureData, MoistureDataDto } from "../model/models";
import { useQuery } from "@tanstack/react-query";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const MOISTURE_DATA_URL = `${BACKEND_URL}/mapData`;

const MOCK_DATA: MoistureDataDto = {
    timestamp: "1970-01-01 00:00:00",
    records: [
        {
            latitude: 52.03333,
            longitude: 8.53333,
            altitude: 0,
            soil_moisture: 13,
            avg_soil_moisture: 13.37,
            device: "mock",
            last_update: "1970-01-01 00:00:00",
        },
    ],
};

function processData(data: MoistureDataDto): MoistureData {
    function toDate(timestamp: string): Date {
        return new Date(/\+|Z/i.test(timestamp) ? timestamp : timestamp + "Z");
    }
    const timestamp = toDate(data.timestamp);
    return {
        records: data.records.map((record) => {
            const last_updated = toDate(record.last_update);
            return { ...record, last_updated };
        }),
        timestamp,
    };
}

interface MoistureState {
    loading: Boolean;
    error: Boolean;
    data: MoistureData | undefined;
}

export default function useMoistureData(): MoistureState {
    const { data: dto, status } = useQuery({
        queryKey: ["moisture-data"],
        queryFn: async () => fetch(MOISTURE_DATA_URL).then((r) => r.json().then((r) => r as MoistureDataDto)),
    });

    const loading = status === "pending";
    const error = status === "error";

    if (!dto && import.meta.env.DEV) {
        return {
            loading: false,
            error: false,
            data: processData(MOCK_DATA),
        };
    }

    const data = status === "success" && dto ? processData(dto) : undefined;

    return { loading, error, data };
}
