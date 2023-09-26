//import "./index.css";
function LegendOverlay({ layerName }: { layerName: string }) {
    return (
        <div className="Legend">
            {/* Legende wird auf eigentliche Größe gescaled, aber es muss noch ein Weg gefunden werden alle
            Bilder auf ca. dei gleiche Größe zu bringen 
            z.B. Bild hat geringere Höhe --> Bild wird in Höhe transformiert 
            
            Geoserver Docs: https://docs.geoserver.org/main/en/user/services/wms/get_legend_graphic/index.html
            */}

            <div
                style={{
                    right: "10px",
                    top: "10px",
                    position: "absolute",
                    zIndex: 1000,
                    opacity: 0.8,
                    maxWidth: "50%",
                    height: "auto",
                }}
            >
                <img
                    src={`https://cdc.dwd.de/geoserver/CDC/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${layerName}`}
                    alt="background"
                    className="imgLegend"
                />
            </div>
        </div>
    );
}

export default LegendOverlay;
