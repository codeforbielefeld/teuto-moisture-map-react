import L, {Map as LeafletMap} from 'leaflet';
import * as React from 'react';
import {useEffect} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import ReactDOMServer from 'react-dom/server';
import {FontWeights, getTheme, Icon, Link, mergeStyleSets, Text} from '@fluentui/react';
import './index.css'


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
});


const markerHtmlStyles = (customColor: String) =>`
  background-color: ${customColor};
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  left: -0.5rem;
  top: -0.5rem;
  position: relative;
  border-radius: 1.5rem 1.5rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

const icon = L.divIcon({
    className: "custom-pin",
    iconAnchor: [4, 24],
    popupAnchor: [4, -36],
    html: `<span style="${markerHtmlStyles('#228B22')}" />`
})

const Map: React.FC = () => {
    return (<>
        <Marker icon={icon} position={[52.03333, 8.53333]}>
            <Popup className="request-popup">
                <div className={styles.header}>
                    <Text className={styles.title}>
                        All of your favorite people
                    </Text>
                </div>
                <div className={styles.inner}>
                    <Text className={styles.subtext}>
                        Message body is optional. If help documentation is available, consider adding a link to
                        learn more at the
                        bottom.
                    </Text>
                    <div className={styles.actions}>
                        <Link className={styles.link} href="http://google.com" target="_blank">
                            Go to website
                        </Link>
                    </div>
                </div>
            </Popup>
        </Marker>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /></>);
};

export default Map;
