export interface SensorInfoDto {
    device: string;
    altitude: number;
    latitude: number;
    longitude: number;
    soil_moisture: number;
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
    timestamp: Date;
}

export interface MoistureData {
    records: SensorInfo[];
    timestamp: Date;
}
