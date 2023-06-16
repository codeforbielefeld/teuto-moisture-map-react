import useFetch from "use-http";
import { MoistureData, MoistureDataDto } from "../model/models";
import add from "date-fns/add";
import { useCallback, useEffect, useRef, useState } from "react";

const MOISTURE_DATA_URL = process.env.REACT_APP_MOISTURE_DATA_URL;

const MOCK_DATA: MoistureDataDto = {
    timestamp: "1970-01-01 00:00:00",
    records: [
        {
            latitude: 52.03333,
            longitude: 8.53333,
            altitude: 0,
            percent: 13.37,
            device: "mock",
        },
    ],
};

function processData(data: MoistureDataDto): MoistureData {
    const timestamp = new Date(
        /\+|Z/i.test(data.timestamp) ? data.timestamp : data.timestamp + "Z"
    );
    return {
        records: data.records.map((record) => {
            return { ...record, timestamp };
        }),
        timestamp,
    };
}

interface MoistureState {
    loading: Boolean;
    error: Error | undefined;
    data: MoistureData | undefined;
}

export default function useMoistureData(): MoistureState {
    const [signal, setSignal] = useState(true);
    const {
        loading,
        error,
        data: dto,
        cache,
    } = useFetch<MoistureDataDto>(MOISTURE_DATA_URL, { cache: "reload" }, [
        signal,
    ]);
    const reload = useCallback(() => {
        cache.clear();
        setSignal(!signal);
    }, [cache, signal]);

    const validTo = useRef(add(new Date(), { minutes: 5 }));

    useEffect(() => {
        const checkValid = () => {
            if (validTo.current < new Date()) {
                reload();
            }
        };
        const checkLive = () => {
            const r = window.setInterval(checkValid, 5 * 60 * 1000);
            window.addEventListener("blur", () => window.clearInterval(r), {
                once: true,
            });
        };
        window.addEventListener("focus", checkValid);
        window.addEventListener("focus", checkLive);
        return () => {
            window.removeEventListener("focus", checkValid);
            window.removeEventListener("focus", checkLive);
        };
    }, [reload]);

    if (!dto && process.env.NODE_ENV === "development") {
        return {
            loading: false,
            error: undefined,
            data: processData(MOCK_DATA),
        };
    }

    const data = dto ? processData(dto) : undefined;
    validTo.current = data
        ? add(data.timestamp, { days: 1, minutes: 1 })
        : add(new Date(), { minutes: 5 });

    return { loading, error, data };
}