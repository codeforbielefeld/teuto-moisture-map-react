import WMSOverlay from "./WMSOverlay";
import { FC } from "react";

type controlOverlayProps = {
    show: boolean;
    layerName: string;
    attribution: string;
    setShowLayer: React.Dispatch<React.SetStateAction<number>>;
};

const ControlOverlay: FC<controlOverlayProps> = ({ show, layerName, attribution, setShowLayer }) => {
    return <>{show && <WMSOverlay layerName={layerName} attribution={attribution} setShowLayer={setShowLayer} />}</>;
};
export default ControlOverlay;
