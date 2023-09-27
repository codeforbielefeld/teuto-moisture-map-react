import ControlOverlay from "./ControlOverlay";
import { FC } from "react";

type LayerOverlayProps = {
    showLayer: number;
    setShowLayer: React.Dispatch<React.SetStateAction<number>>;
};

const LayerOverlay: FC<LayerOverlayProps> = ({ showLayer, setShowLayer }) => {
    return (
        <>
            <ControlOverlay
                show={showLayer == 1}
                layerName="CDC:GRD_DEU_P1D_BF-GRB"
                attribution='Quelle: <a href="https://www.dwd.de/DE/Home/home_node.html">Deutscher Wetterdienst </a>'
                setShowLayer={setShowLayer}
            />
            <ControlOverlay
                show={showLayer == 2}
                layerName="CDC:GRD_DEU_P1M_BFGSL"
                attribution='Quelle: <a href="https://www.dwd.de/DE/Home/home_node.html">Deutscher Wetterdienst </a>'
                setShowLayer={setShowLayer}
            />
            <ControlOverlay
                show={showLayer == 3}
                layerName="CDC:GRD_DEU_P1M_RR"
                attribution='Quelle: <a href="https://www.dwd.de/DE/Home/home_node.html">Deutscher Wetterdienst </a>'
                setShowLayer={setShowLayer}
            />
        </>
    );
};

export default LayerOverlay;
