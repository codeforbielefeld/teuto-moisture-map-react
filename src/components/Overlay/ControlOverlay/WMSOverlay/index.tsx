import { WMSTileLayer } from "react-leaflet";
import { FC, useState } from "react";
import LegendOverlay from "./LegendOverlay";
import { SquareLoader } from "react-spinners";
import "./index.css";

type WMSOverlayProps = {
    layerName: string;
    attribution: string;
    setShowLayer: React.Dispatch<React.SetStateAction<number>>;
};

const WMSOverlay: FC<WMSOverlayProps> = ({ layerName, attribution, setShowLayer }) => {
    const [loading, setLoading] = useState(false);
    const changeLoad = () => {
        setLoading(!loading);
    };
    const catchServerError = () => {
        setShowLayer(0);
        alert("Das ausgewählte Overlay kann nicht vom Server abgerufen werden.");
    };

    return (
        <div>
            {/*
            Das Package: https://www.npmjs.com/package/react-spinners
            Alle Loader visual: https://www.davidhu.io/react-spinners/
            */}
            {loading && (
                <div className="loading-spinner">
                    <SquareLoader color="blue" loading={loading} aria-label="Loading Spinner" data-testid="loader" />
                </div>
            )}

            {/*
            Alle Layer: https://cdc.dwd.de/geoserver/web/wicket/bookmarkable/org.geoserver.web.demo.MapPreviewPage?1&filter=false 
            Erkärungsvideo: https://www.youtube.com/watch?v=N_UIwXg-tg4&list=PLyWyQBSWLw1OS7HojnpX6aogfm7LtF39S&index=6
            Geoserver Docs: https://docs.geoserver.org/main/en/user/services/wms/reference.html
            */}
            <WMSTileLayer
                url="https://cdc.dwd.de/geoserver/CDC/wms"
                layers={layerName}
                format="image/png"
                attribution={attribution}
                transparent={true}
                opacity={0.7}
                eventHandlers={{
                    loading: changeLoad,
                    load: changeLoad,
                    tileerror: catchServerError,
                }}
            />
            <LegendOverlay layerName={layerName} />
        </div>
    );
};

export default WMSOverlay;
