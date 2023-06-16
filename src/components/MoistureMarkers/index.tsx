import L from "leaflet";
import * as React from "react";
import { Marker, Popup } from "react-leaflet";
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
        html: renderToString(
            <img src={getImageForMeasurment(record)} alt={"tag"}></img>
        ),
    });

const getImageForMeasurment = (record: SensorInfo) => {
    return record.soil_moisture < 10
        ? tree_dead
        : record.soil_moisture < 20
        ? tree_brown
        : record.soil_moisture < 25
        ? tree_yellow
        : tree_green;
};

const MoistureMarkers: React.FC = () => {
    const { loading, error, data } = useMoistureData();
    if (loading)
        return (
            <Overlay isDarkThemed={true} className={styles.overlay}>
                <div className={styles.loading}>Lade Feuchtedaten</div>
            </Overlay>
        );
    else if (error)
        return (
            <Overlay isDarkThemed={true} className={styles.overlay}>
                <div className={styles.loading}>
                    Fehler beim Laden der Daten :(
                </div>
            </Overlay>
        );
    else
        return (
            <>
                {data?.records?.map((record: SensorInfo, idx) => (
                    <Marker
                        key={idx}
                        icon={icon(record)}
                        position={[record.latitude, record.longitude]}
                    >
                        <Popup className="request-popup">
                            <SensorTooltip record={record} />
                        </Popup>
                    </Marker>
                ))}
            </>
        );
};

export default MoistureMarkers;
