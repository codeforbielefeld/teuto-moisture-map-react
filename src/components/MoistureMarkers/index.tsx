import L from 'leaflet';
import * as React from 'react';
import { Marker, Popup } from "react-leaflet";
import { FontWeights, getTheme, mergeStyleSets, Overlay, Text } from '@fluentui/react';
import './index.css'
import useFetch from 'use-http';
import { Measurement, MeasurementData } from '../../model/models';
import { renderToString } from 'react-dom/server'

import tree_green from '../../resources/images/tree_green_50.png'
import tree_yellow from '../../resources/images/tree_yellow_50.png'
import tree_brown from '../../resources/images/tree_brown_50.png'
import tree_dead from '../../resources/images/tree_dead_50.png'


const MOISTURE_DATA_URL = process.env.REACT_APP_MOISTURE_DATA_URL 

const theme = getTheme();
const styles = mergeStyleSets({
    buttonArea: {
        verticalAlign: 'top',
        display: 'inline-block',
        textAlign: 'center',
        margin: '0 100px',
        minWidth: 130,
        height: 32,
    },
    callout: {
        maxWidth: 300,
    },
    header: {
        padding: '12px 18px 12px',
    },
    title: [
        theme.fonts.xLarge,
        {
            margin: 0,
            fontWeight: FontWeights.semilight,
        },
    ],
    inner: {
        height: '100%',
        padding: '0 18px 15px',
    },
    actions: {
        position: 'relative',
        marginTop: 20,
        width: '100%',
        whiteSpace: 'nowrap',
    },
    subtext: [
        theme.fonts.small,
        {
            margin: 0,
            fontWeight: FontWeights.semilight,
        },
    ],
    link: [
        theme.fonts.medium,
        {
            color: theme.palette.neutralPrimary,
        },
    ],
    overlay: {
        "z-index": 9000,
        "display": "flex",
        "align-items": "center",
        "justify-content": "center",

    },
    loading: {
        color: "white",
        fontWeight: FontWeights.semibold,
        fontSize: 20

    },
    tree_icon: {
        top: -59,
        left: -26,
        position: "relative"
    }
});



const icon = (record: Measurement) => L.divIcon({
    className: "custom-pin",
    iconAnchor: [4, 24],
    popupAnchor: [4, -36],
    html: renderToString(<img src={getImageForMeasurment(record)} className={styles.tree_icon}></img>)    
})

const getImageForMeasurment = (record: Measurement) => {
    return record.percent < 10 ? tree_dead        : 
    record.percent < 20 ? tree_brown : 
    record.percent < 25 ? tree_yellow :
    tree_green;
};

const MoistureMarkers: React.FC = () => {
    const { loading, error, data } = useFetch<MeasurementData>(MOISTURE_DATA_URL, {}, []);    
    if (loading)
        return (
            <Overlay isDarkThemed={true} className={styles.overlay}>
                <div className={styles.loading}>Lade Feuchtedaten</div>
            </Overlay>
        )
    else if (error)
        return (
            <Overlay isDarkThemed={true} className={styles.overlay}>
                <div className={styles.loading}>Fehler beim Laden der Daten :(</div>
            </Overlay>)
    else
        return (<>
            {
                data?.records?.map((record: Measurement, idx) => (
                    <Marker key={idx} icon={icon(record)} position={[record.latitude, record.longitude]}>
                        <Popup className="request-popup">
                            <div className={styles.header}>
                                <Text className={styles.title}>
                                    Feuchte: {record.percent} %
                                </Text>
                            </div>
                            <div className={styles.inner}>
                                <Text className={styles.subtext}>
                                    Letzte Aktualisierung: {new Date(data.timestamp).toLocaleString()}
                                </Text>
                            </div>
                        </Popup>
                    </Marker>
                ))
            }
        </>);
};

export default MoistureMarkers;
