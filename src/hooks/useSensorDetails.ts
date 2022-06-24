import { DeviceId, SensorDetails } from "../model/models";

export default function useSensorDetails(sensor: DeviceId): SensorDetails {

    // Mock some data
    const rp = () => Math.random() * 40
    const rr = () => Math.random() < 0.6? 0 : Math.random() * 5
    const recentDays = [7, 6, 5, 4, 3, 2, 1, 0].map(x => { const d = new Date(); d.setDate(d.getDate() - x); return d })
    return {
        device: sensor, 
        recentDays: recentDays.map(d => ({ date: d, percent: rp(), peers: rp(), previousYears: rp(), precipitation: rr()}))
    }
}