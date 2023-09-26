import React, { useEffect, useState } from "react";
import "./App.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Map as LeafletMap, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import AppCommandBar from "./components/CommandBar";
import SidePanel from "./components/SidePanel";
import { useBoolean } from "@fluentui/react-hooks";
import MoistureMarkers from "./components/MoistureMarkers";
import Markdown from "./components/Markdown";
import ControlOverlay from "./components/CommandBar/ControlOverlay";
import VerticalSlider from "./components/verticalSlider";
import ControlOverlayUI from "./components/CommandBar/ControlOverlay/ControlOverlayUI";
import marker from "./resources/images/tree_brown_100.png";

/*  Leaflet only allows us to use "useMap" inside a MapContainer.
    As the Toolbar is outside of the MapContainer we use this fake child component to 
    export it. 
 */

function MapHack({ setMap }: { setMap: any }): null {
    const map = useMap();
    setMap(map);
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
    const [value, setValue] = useState<number>(0);

    const myIcon = new Icon({
        iconUrl: marker,
        iconSize: [50, 79],
    });

    useEffect(() => {
        const cb = () => setHeight(window.innerHeight);
        window.addEventListener("resize", cb);
        return () => window.removeEventListener("resize", cb);
    });
    /*
    ================================================
    Padding ist falsch
    ================================================
    */

    /*
                                                                                                                                                                                                                                                                                                                          (Koordinaten)(UNTERSCHIED)         (Anfangsdatum)                      (Enddatum)
    https://cdc.dwd.de/geoserver/CDC/ows?&service=WFS&version=2.0.0&request=GetFeature&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=text%2Fjavascript&viewparams=observed_property_code:GRD_DEU_P1D_BF-GRB;location:POINT(8.5+52.06);srid:4326;begin_position:2023-08-07T00:00:00Z;end_position:2023-09-06T23:59:59Z;srid_out:4.326;regexp:true
    https://cdc.dwd.de/geoserver/CDC/ows?&service=WFS&version=2.0.0&request=GetFeature&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=text%2Fjavascript&viewparams=observed_property_code:GRD_DEU_P1D_BF-GRB;location:POINT(8.5+52.05);srid:4326;begin_position:2023-08-07T00:00:00Z;end_position:2023-09-06T23:59:59Z;srid_out:4.326;regexp:true
    https://cdc.dwd.de/geoserver/CDC/ows?&service=WFS&version=2.0.0&request=GetFeature&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=text%2Fjavascript&viewparams=observed_property_code:GRD_DEU_P1D_BF-GRB;location:POINT(8.49+52.05);srid:4326;begin_position:2023-08-07T00:00:00Z;end_position:2023-09-06T23:59:59Z;srid_out:4.326;regexp:true
    https://cdc.dwd.de/geoserver/CDC/ows?&service=WFS&version=2.0.0&request=GetFeature&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=text%2Fjavascript&viewparams=observed_property_code:GRD_DEU_P1D_BF-GRB;location:POINT(8.48+52.05);srid:4326;begin_position:2023-08-07T00:00:00Z;end_position:2023-09-06T23:59:59Z;srid_out:4.326;regexp:true
    https://cdc.dwd.de/geoserver/CDC/ows?&service=WFS&version=2.0.0&request=GetFeature&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=application/json&viewparams=observed_property_code%3AGRD_DEU_P1D_BF-GRB%3Blocation%3APOINT(8.55+52.06)%3Bsrid%3A4326%3Bbegin_position%3A2023-07-29T00%3A00%3A00Z%3Bend_position%3A2023-08-28T23%3A59%3A59Z%3Bsrid_out%3A4.326%3Bregexp%3Atrue
    https://cdc.dwd.de/geoserver/CDC/ows?&service=WFS&version=2.0.0&request=GetFeature&format_options=callback%3AsetValByEle&propertyname=OBSERVED_PROPERTY_CODE%2CRESULT_TIME%2CRESULT&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=text%2Fjavascript&viewparams=observed_property_code%3AGRD_DEU_P1D_BF-GRB%3Blocation%3APOINT(8.37+52.07)%3Bsrid%3A4326%3Bbegin_position%3A2023-06-23T00%3A00%3A00Z%3Bend_position%3A2023-07-23T23%3A59%3A59Z%3Bsrid_out%3A4.326%3Bregexp%3Atrue
    
    GEOMETRY = NULL 
    https://cdc.dwd.de/geoserver/CDC/ows?&service=WFS&version=2.0.0&request=GetFeature&propertyname=OBSERVED_PROPERTY_CODE%2CRESULT_TIME%2CRESULT&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=application/json&viewparams=observed_property_code%3AGRD_DEU_P1D_BF-GRB%3Blocation%3APOINT(8.37+52.07)%3Bsrid%3A4326%3Bbegin_position%3A2023-06-23T00%3A00%3A00Z%3Bend_position%3A2023-07-23T23%3A59%3A59Z%3Bsrid_out%3A4.326%3Bregexp%3Atrue
    GEOMETRY = type und coordinates                                                   (formatOptions kann weg gelassen werden)
    https://cdc.dwd.de/geoserver/CDC/ows?&service=WFS&version=2.0.0&request=GetFeature&format_options=callback%3AsetValByEle&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=application/json&viewparams=observed_property_code%3AGRD_DEU_P1D_BF-GRB%3Blocation%3APOINT(8.37+52.07)%3Bsrid%3A4326%3Bbegin_position%3A2023-06-23T00%3A00%3A00Z%3Bend_position%3A2023-07-23T23%3A59%3A59Z%3Bsrid_out%3A4.326%3Bregexp%3Atrue

    https://cdc.dwd.de/geoserver/CDC/ows?&callback=jQuery110205837666308100369_1693308770769&service=WFS&version=2.0.0&request=GetFeature&format_options=callback%3AsetValByEle&propertyname=OBSERVED_PROPERTY_CODE%2CRESULT_TIME%2CRESULT&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=text%2Fjavascript&viewparams=observed_property_code%3AGRD_DEU_P1D_BF-GRB%3Blocation%3APOINT(8.56+52.05)%3Bsrid%3A4326%3Bbegin_position%3A2023-07-29T00%3A00%3A00Z%3Bend_position%3A2023-08-28T23%3A59%3A59Z%3Bsrid_out%3A4.326%3Bregexp%3Atrue&_=1693308770774
    https://cdc.dwd.de/geoserver/CDC/ows?&callback=jQuery110205837666308100369_1693308770767&service=WFS&version=2.0.0&request=GetFeature&format_options=callback%3AsetValByEle&propertyname=OBSERVED_PROPERTY_CODE%2CRESULT_TIME%2CRESULT&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=text%2Fjavascript&viewparams=observed_property_code%3AGRD_DEU_P1D_BF-GRB%3Blocation%3APOINT(8.54+52.05)%3Bsrid%3A4326%3Bbegin_position%3A2023-07-29T00%3A00%3A00Z%3Bend_position%3A2023-08-28T23%3A59%3A59Z%3Bsrid_out%3A4.326%3Bregexp%3Atrue&_=1693308770772
    https://cdc.dwd.de/geoserver/CDC/ows?&callback=jQuery110205837666308100369_1693308770767&service=WFS&version=2.0.0&request=GetFeature&format_options=callback%3AsetValByEle&propertyname=OBSERVED_PROPERTY_CODE%2CRESULT_TIME%2CRESULT&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=text%2Fjavascript&viewparams=observed_property_code%3AGRD_DEU_P1D_BF-GRB%3Blocation%3APOINT(8.56+52.15)%3Bsrid%3A4326%3Bbegin_position%3A2023-07-29T00%3A00%3A00Z%3Bend_position%3A2023-08-28T23%3A59%3A59Z%3Bsrid_out%3A4.326%3Bregexp%3Atrue&_=1693308770776
    https://cdc.dwd.de/geoserver/CDC/ows?&callback=jQuery110205837666308100369_1693308770769&service=WFS&version=2.0.0&request=GetFeature&format_options=callback%3AsetValByEle&propertyname=OBSERVED_PROPERTY_CODE%2CRESULT_TIME%2CRESULT&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=text%2Fjavascript&viewparams=observed_property_code%3AGRD_DEU_P1D_BF-GRB%3Blocation%3APOINT(8.65+52.21)%3Bsrid%3A4326%3Bbegin_position%3A2023-07-29T00%3A00%3A00Z%3Bend_position%3A2023-08-28T23%3A59%3A59Z%3Bsrid_out%3A4.326%3Bregexp%3Atrue&_=1693308770778
    https://cdc.dwd.de/geoserver/CDC/ows?&callback=jQuery110206934188235651018_1693309122917&service=WFS&version=2.0.0&request=GetFeature&format_options=callback%3AsetValByEle&propertyname=OBSERVED_PROPERTY_CODE%2CRESULT_TIME%2CRESULT&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=text%2Fjavascript&viewparams=observed_property_code%3AGRD_DEU_P1D_BF-GRB%3Blocation%3APOINT(8.57+51.97)%3Bsrid%3A4326%3Bbegin_position%3A2023-07-29T00%3A00%3A00Z%3Bend_position%3A2023-08-28T23%3A59%3A59Z%3Bsrid_out%3A4.326%3Bregexp%3Atrue&_=1693309122922
    https://cdc.dwd.de/geoserver/CDC/ows?&callback=jQuery11020987314551610351_1693309389901&service=WFS&version=2.0.0&request=GetFeature&format_options=callback%3AsetValByEle&propertyname=OBSERVED_PROPERTY_CODE%2CRESULT_TIME%2CRESULT&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=text%2Fjavascript&viewparams=observed_property_code%3AGRD_DEU_P1D_BF-GRB%3Blocation%3APOINT(8.55+52.06)%3Bsrid%3A4326%3Bbegin_position%3A2023-07-29T00%3A00%3A00Z%3Bend_position%3A2023-08-28T23%3A59%3A59Z%3Bsrid_out%3A4.326%3Bregexp%3Atrue&_=1693309389906
    https://cdc.dwd.de/geoserver/CDC/ows?&callback=jQuery1102016309213102604003_1693309435632&service=WFS&version=2.0.0&request=GetFeature&format_options=callback%3AsetValByEle&propertyname=OBSERVED_PROPERTY_CODE%2CRESULT_TIME%2CRESULT&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=text%2Fjavascript&viewparams=observed_property_code%3AGRD_DEU_P1D_BF-GRB%3Blocation%3APOINT(8.55+52.06)%3Bsrid%3A4326%3Bbegin_position%3A2023-07-29T00%3A00%3A00Z%3Bend_position%3A2023-08-28T23%3A59%3A59Z%3Bsrid_out%3A4.326%3Bregexp%3Atrue&_=1693309435637
    https://cdc.dwd.de/geoserver/CDC/ows?&service=WFS&version=2.0.0&request=GetFeature&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=text%2Fjavascript&viewparams=observed_property_code%3AGRD_DEU_P1D_BF-GRB%3Blocation%3APOINT(8.55+52.06)%3Bsrid%3A4326%3Bbegin_position%3A2023-07-29T00%3A00%3A00Z%3Bend_position%3A2023-08-28T23%3A59%3A59Z%3Bsrid_out%3A4.326%3Bregexp%3Atrue&count=1
    
    
    ===============
    https://cdc.dwd.de/geoserver/CDC/ows?&callback=jQuery&service=WFS&version=2.0.0&request=GetFeature&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=application/json&viewparams=observed_property_code%3AGRD_DEU_P1D_BF-GRB%3Blocation%3APOINT(8.55+52.06)%3Bsrid%3A4326%3Bbegin_position%3A2023-07-29T00%3A00%3A00Z%3Bend_position%3A2023-08-28T23%3A59%3A59Z%3Bsrid_out%3A4.326%3Bregexp%3Atrue
    https://cdc.dwd.de/geoserver/CDC/ows?&service=WFS&version=2.0.0&request=GetFeature&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=application/json&viewparams=observed_property_code%3AGRD_DEU_P1D_BF-GRB%3Blocation%3APOINT(8.55+52.06)%3Bsrid%3A4326%3Bbegin_position%3A2023-07-29T00%3A00%3A00Z%3Bend_position%3A2023-08-28T23%3A59%3A59Z%3Bsrid_out%3A4.326%3Bregexp%3Atrue
    ===============
    https://cdc.dwd.de/geoserver/CDC/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=CDC:OBSERVATIONS_API.GET_EVENT_RESULT_TIMES&outputFormat=text/javascript&format_options=callback:set_1878732965_Layer_Time&sortBy=TIME_STAMP&viewparams=observed_property_guid:1564838978;begin_position:2022-07-29T00:00:00.000Z;end_position:2023-08-28T00:00:00.000Z&callback=jQuery11020880727675764279_1693298035627&_=1693298035628
    https://cdc.dwd.de/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=CDC:OBSERVATIONS_API.GET_EVENT_RESULT_TIMES
    https://cdc.dwd.de/geoserver/CDC/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=CDC:OBSERVATIONS_API.GET_EVENT_RESULT_TIMES

    BEISPIEL --> SLIDER


    https://cdc.dwd.de/geoserver/CDC/wms?service=WMS&version=1.1.0&request=GetMap&layers=CDC%3AGRD_DEU_P1D_BF-GRB
    &bbox=3280415.0,5237501.0,3934415.0,6103501.0&width=579&height=768&srs=EPSG%3A31467&styles=&format=application%2Fopenlayers3
    &ELEVATION=10&TIME=2023-07-22T00%3A00%3A00.000Z

    &ELEVATION=10
    &TIME=2023-08-22T00%3A00%3A00.000Z
    */

    //RESIZE FEHLT

    const test = () => {
        console.log(
            "https://cdc.dwd.de/geoserver/CDC/ows?&service=WFS&version=2.0.0&request=GetFeature&propertyname=OBSERVED_PROPERTY_CODE%2CRESULT_TIME%2CRESULT&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=application/json&viewparams=observed_property_code%3AGRD_DEU_P1D_BF-GRB%3Blocation%3APOINT(8.37+52.07)%3Bsrid%3A4326%3Bbegin_position%3A2023-06-23T00%3A00%3A00Z%3Bend_position%3A2023-07-23T23%3A59%3A59Z%3Bsrid_out%3A4.326%3Bregexp%3Atrue",
        );
    };
    return (
        <div className="App" style={{ zIndex: 1000 }}>
            {/* <button onClick={test} /> */}
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
                {/*<MoistureMarkers />*/}
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[52.03, 8.53]} icon={myIcon}>
                    <Popup>Hallo</Popup>
                </Marker>
                <VerticalSlider setValue={setValue} value={value} />

                <ControlOverlay
                    show={showLayer == 1 ? true : false}
                    layerName="CDC:GRD_DEU_P1D_BF-GRB"
                    attribution='Quelle: <a href="https://www.dwd.de/DE/Home/home_node.html">Deutscher Wetterdienst </a>'
                    setShowLayer={setShowLayer}
                />
                <ControlOverlay
                    show={showLayer == 2 ? true : false}
                    layerName="CDC:GRD_DEU_P1M_BFGSL"
                    attribution='Quelle: <a href="https://www.dwd.de/DE/Home/home_node.html">Deutscher Wetterdienst </a>'
                    setShowLayer={setShowLayer}
                />
                <ControlOverlay
                    show={showLayer == 3 ? true : false}
                    layerName="CDC:GRD_DEU_P1M_RR"
                    attribution='Quelle: <a href="https://www.dwd.de/DE/Home/home_node.html">Deutscher Wetterdienst </a>'
                    setShowLayer={setShowLayer}
                />
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
