import L from "leaflet";
import * as React from "react";
import { useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { FontWeights, mergeStyleSets, Overlay } from "@fluentui/react";
import "./index.css";
import { SensorInfo } from "../../model/models";
import { renderToString } from "react-dom/server";

import tree_green from "../../resources/images/tree_green_50.png";
import tree_yellow from "../../resources/images/tree_yellow_50.png";
import tree_brown from "../../resources/images/tree_brown_50.png";
import tree_dead from "../../resources/images/tree_dead_50.png";
import SensorTooltip from "../SensorTooltip";
import useMoistureData from "../../hooks/useMoistureData";

const styles = mergeStyleSets({
    buttonArea: {
        verticalAlign: "top",
        display: "inline-block",
        textAlign: "center",
        margin: "0 100px",
        minWidth: 130,
        height: 32,
    },
    callout: {
        maxWidth: 300,
    },
    actions: {
        position: "relative",
        marginTop: 20,
        width: "100%",
        whiteSpace: "nowrap",
    },
    overlay: {
        "z-index": 9000,
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
    },
    loading: {
        color: "white",
        fontWeight: FontWeights.semibold,
        fontSize: 20,
    },
});

const icon = (record: SensorInfo) =>
    L.divIcon({
        className: "custom-pin",
        iconAnchor: [30, 83],
        popupAnchor: [-14, -83],
        html: renderToString(<img src={getImageForMeasurement(record)} alt={"tag"}></img>),
    });

const getImageForMeasurement = (record: SensorInfo) => {
    return record.soil_moisture < 10
        ? tree_dead
        : record.soil_moisture < 15
          ? tree_brown
          : record.soil_moisture < 20
            ? tree_yellow
            : tree_green;
};

const MoistureMarkers: React.FC = () => {
    const { loading, error, data } = useMoistureData();
    const map = useMap();
    const [boundingBox, setBoundingBox] = useState<number[][]>([]);

    if (loading)
        return (
            <Overlay isDarkThemed={true} className={styles.overlay}>
                <div className={styles.loading}>Lade Feuchtedaten</div>
            </Overlay>
        );
    else if (error)
        return (
            <Overlay isDarkThemed={true} className={styles.overlay}>
                <div className={styles.loading}>Fehler beim Laden der Daten :(</div>
            </Overlay>
        );
    else {
        const lats = data?.records?.map((record) => record.latitude);
        const longs = data?.records?.map((record) => record.longitude);
        if (lats && longs) {
            const newBB = [
                [Math.min(...lats), Math.min(...longs)],
                [Math.max(...lats), Math.max(...longs)],
            ];
            if (JSON.stringify(newBB) !== JSON.stringify(boundingBox)) {
                map.fitBounds([
                    [Math.min(...lats), Math.min(...longs)],
                    [Math.max(...lats), Math.max(...longs)],
                ]);
                setBoundingBox(newBB);
            }
        }
        return <>{data?.records?.map((record: SensorInfo, idx) => <MoistureMarker key={idx} record={record} />)}</>;
    }
};

function MoistureMarker({ record }: { record: SensorInfo }) {
    const [open, setOpen] = useState(true);
    const ref = React.useRef<number | undefined>();
    return (
        <Marker
            icon={icon(record)}
            position={[record.latitude, record.longitude]}
            // Leaflet keeps the popup component mounted once the popup has been opened.
            // This keeps the query used by the tooltip in use causing spurious fetches for closed popups.
            // We manually keep track of the popup and unmount the children to avoid this.
            // The timeout is used for smooth fadeout.
            eventHandlers={{
                popupopen: () => {
                    if (ref.current) {
                        window.clearTimeout(ref.current);
                        ref.current = undefined;
                    }
                    setOpen(true);
                },
                popupclose: () => {
                    ref.current = window.setTimeout(() => setOpen(false), 1000);
                },
            }}
        >
            <Popup className="request-popup" maxWidth={600}>
                {open ? <SensorTooltip record={record} /> : null}
            </Popup>
        </Marker>
    );
}

export default MoistureMarkers;
