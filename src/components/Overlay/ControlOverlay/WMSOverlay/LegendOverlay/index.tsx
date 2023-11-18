function LegendOverlay({ layerName }: { layerName: string }) {
    return (
        <div
            className="Legend"
            style={{
                right: "10px",
                top: "10px",
                position: "absolute",
                zIndex: 1000,
                opacity: 0.8,
            }}
        >
            {/*
            Geoserver Docs: https://docs.geoserver.org/main/en/user/services/wms/get_legend_graphic/index.html
            */}

            <img
                src={`https://cdc.dwd.de/geoserver/CDC/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${layerName}`}
                alt="background"
                className="imgLegend"
            />
        </div>
    );
}

export default LegendOverlay;
