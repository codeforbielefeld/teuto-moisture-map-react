import "./App.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AppCommandBar from "./components/CommandBar";
import SidePanel from "./components/SidePanel";
import { useBoolean } from "@fluentui/react-hooks";
import MoistureMarkers from "./components/MoistureMarkers";
import { Info, Imprint } from "./components/Markdown";
import React, { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ControlOverlayUI from "./components/Overlay/ControlOverlay/ControlOverlayUI";
import LayerOverlay from "./components/Overlay";
import { LeafletEvent } from "leaflet";

export enum HistoryWindow {
    hourly = "1h",
    daily = "1d",
    weekly = "1w",
    monthly = "4w",
}
export const HistoryWindowContext = createContext<{
    historyWindow: HistoryWindow;
    setHistoryWindow: React.Dispatch<React.SetStateAction<HistoryWindow>>;
}>({ historyWindow: HistoryWindow.daily, setHistoryWindow: () => {} });

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 60 * 1000,
            gcTime: 60 * 60 * 1000,
        },
    },
});

/*  Leaflet only allows us to use "useMap" inside a MapContainer.
    As the Toolbar is outside of the MapContainer we use this fake child component to
    export it.
 */

function MapHack({ setMap }: { setMap: any }): null {
    const map = setMap();
    useEffect(() => {
        setMap(map);
    });
    return null;
}

function App() {
    const [height, setHeight] = React.useState(window.innerHeight);
    const position: [number, number] = [52.01, 8.542732];
    const [map, setMap] = React.useState<LeafletEvent>();
    const zoom = 13;

    const [historyWindow, setHistoryWindow] = useState(HistoryWindow.daily);

    const [imprintOpen, { setTrue: openImprint, setFalse: dismissImprint }] = useBoolean(false);
    const [infoOpen, { setTrue: openInfo, setFalse: dismissInfo }] = useBoolean(false);
    const [overlayOpen, { setTrue: openOverlay, setFalse: dismissOverlay }] = useBoolean(false);
    const [showLayer, setShowLayer] = useState<number>(0);

    // We manually update the height of the map to the window.innerHeight to avoid problems with mobile views
    useEffect(() => {
        const cb = () => setHeight(window.innerHeight);
        window.addEventListener("resize", cb);
        return () => window.removeEventListener("resize", cb);
    });

    return (
        <QueryClientProvider client={queryClient}>
            <HistoryWindowContext.Provider value={{ historyWindow, setHistoryWindow }}>
                <div className="App">
                    <SidePanel isOpen={infoOpen} dismissPanel={() => dismissInfo()} children={<Info />} />
                    <SidePanel isOpen={imprintOpen} dismissPanel={() => dismissImprint()} children={<Imprint />} />
                    <SidePanel
                        isOpen={overlayOpen}
                        dismissPanel={() => dismissOverlay()}
                        children={<ControlOverlayUI showLayer={showLayer} setShowLayer={setShowLayer} />}
                    />
                    <MapContainer zoomControl={false} center={position} zoom={zoom} style={{ height: height }}>
                        <MoistureMarkers />
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LayerOverlay showLayer={showLayer} setShowLayer={setShowLayer} />
                        <AppCommandBar openImprint={openImprint} openInfo={openInfo} openOverlay={openOverlay} />
                    </MapContainer>
                </div>
            </HistoryWindowContext.Provider>
        </QueryClientProvider>
    );
}

export default App;

//<Toolbar zoomIn={() => map?.zoomIn()} zoomOut={() => map?.zoomOut()} togglePanel={openPanel} />
