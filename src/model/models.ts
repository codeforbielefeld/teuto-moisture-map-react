export interface SensorInfoDto {
    device: string;
    altitude: number;
    latitude: number;
    longitude: number;
    soil_moisture: number;
    soil_temperature?: number;
    soil_conductivity?: number;
    avg_soil_moisture: number;
    avg_soil_temperature?: number;
    avg_soil_conductivity?: number;
    battery?: number;
    avg_battery?: number;
    last_update: string;
}
export interface MoistureDataDto {
    records: SensorInfoDto[];
    timestamp: string;
}

export type DeviceId = string;
export interface SensorInfo {
    device: DeviceId;
    altitude: number;
    latitude: number;
    longitude: number;
    soil_moisture: number;
    soil_temperature?: number;
    soil_conductivity?: number;
    avg_soil_moisture: number;
    avg_soil_temperature?: number;
    avg_soil_conductivity?: number;
    battery?: number;
    avg_battery?: number;
    last_updated: Date;
}

export interface MoistureData {
    records: SensorInfo[];
    timestamp: Date;
}

export interface MoistureMeasurement {
    timestamp: Date;
    moisture: number;
}

export interface SensorDetails {
    info: SensorInfo;
    measurements: MoistureMeasurement[];
    peerMeasurements: MoistureMeasurement[];
}
