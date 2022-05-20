
export interface Measurement {
    device: string
    altitude: number
    latitude: number
    longitude: number
    percent: number
}

export interface MeasurementData {
    records: Measurement[]
    timestamp: string
}