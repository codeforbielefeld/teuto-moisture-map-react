import useFetch from "use-http";
import { MoistureData, MoistureDataDto } from "../model/models";

const MOISTURE_DATA_URL = process.env.REACT_APP_MOISTURE_DATA_URL

const MOCK_DATA: MoistureDataDto = {
    timestamp: "1970-01-01",
    records: [{
        latitude: 52.03333,
        longitude: 8.53333,
        altitude: 0,
        percent: 13.37,
        device: "mock"
    }]

}

function processData(data: MoistureDataDto): MoistureData {
    const timestamp = new Date(/\+|Z/i.test(data.timestamp) ? data.timestamp : data.timestamp + 'Z')
    return {
        records: data.records.map(record => { return { ...record, timestamp } }),
        timestamp
    }
}

export default function useMoistureData(): { loading: Boolean, error: Error | undefined, data: MoistureData | undefined } {
    const { loading, error, data } = useFetch<MoistureDataDto>(MOISTURE_DATA_URL, {}, []);

    if (!data && process.env.NODE_ENV === 'development') {
        return { loading: false, error: undefined, data: processData(MOCK_DATA) }
    }

    return { loading, error, data: data ? processData(data) : undefined }
}