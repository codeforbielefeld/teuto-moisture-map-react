import React, { useEffect, useState } from "react";
import "./App.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import AppCommandBar from "./components/CommandBar";
import SidePanel from "./components/SidePanel";
import { useBoolean } from "@fluentui/react-hooks";
import MoistureMarkers from "./components/MoistureMarkers";
import Markdown from "./components/Markdown";
import ControlOverlayUI from "./components/Overlay/ControlOverlay/ControlOverlayUI";
import LayerOverlay from "./components/Overlay";
import VerticalSlider from "./components/depth_slider";

/*  Leaflet only allows us to use "useMap" inside a MapContainer.
    As the Toolbar is outside of the MapContainer we use this fake child component to 
    export it. 
 */

function MapHack({ setMap }: { setMap: any }): null {
    const map = useMap();
    useEffect(() => {
        setMap(map);
    });
    return null;
}

function App() {
    const [height, setHeight] = React.useState(window.innerHeight);
    const position: [number, number] = [52.01, 8.542732];
    const [map, setMap] = React.useState<LeafletMap>();
    const zoom = 13;

    const [imprintOpen, { setTrue: openImprint, setFalse: dismissImprint }] = useBoolean(false);
    const [infoOpen, { setTrue: openInfo, setFalse: dismissInfo }] = useBoolean(false);
    const [overlayOpen, { setTrue: openOverlay, setFalse: dismissOverlay }] = useBoolean(false);
    const [showLayer, setShowLayer] = useState<number>(0);
    const [depthValue, setDepthValue] = useState<number>(0);

    useEffect(() => {
        const cb = () => setHeight(window.innerHeight);
        window.addEventListener("resize", cb);
        return () => window.removeEventListener("resize", cb);
    });

    return (
        <div className="App">
            <SidePanel isOpen={infoOpen} dismissPanel={() => dismissInfo()} children={<Markdown file={"info.md"} />} />
            <SidePanel
                isOpen={imprintOpen}
                dismissPanel={() => dismissImprint()}
                children={<Markdown file={"imprint.md"} />}
            />
            <SidePanel
                isOpen={overlayOpen}
                dismissPanel={() => dismissOverlay()}
                children={<ControlOverlayUI showLayer={showLayer} setShowLayer={setShowLayer} />}
            />
            <MapContainer zoomControl={false} center={position} zoom={zoom} style={{ height: height }}>
                <MapHack setMap={setMap} />
                <MoistureMarkers />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <VerticalSlider setDepthValue={setDepthValue} depthValue={depthValue} />
                <LayerOverlay showLayer={showLayer} setShowLayer={setShowLayer} />
            </MapContainer>
            <AppCommandBar
                zoomIn={() => map?.zoomIn()}
                zoomOut={() => map?.zoomOut()}
                openImprint={openImprint}
                openInfo={openInfo}
                openOverlay={openOverlay}
            />
        </div>
    );
}

export default App;
