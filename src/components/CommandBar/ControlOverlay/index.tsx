import React, { useEffect, useState } from "react";
import WMSOverlay from "../../WMSOverlay";
import { FC } from "react";

type controlOverlayProps = {
    show: boolean;
    layerName: string;
    attribution: string;
    setShowLayer: React.Dispatch<React.SetStateAction<number>>;
};

const ControlOverlay: FC<controlOverlayProps> = ({ show, layerName, attribution, setShowLayer }) => {
    return (
        <div>{show && <WMSOverlay layerName={layerName} attribution={attribution} setShowLayer={setShowLayer} />}</div>
    );
};
/*
function ControlOverlay({ show, layerName, attribution }: { show: boolean; layerName: string; attribution: string }) {
    return <div>{show && <WMSOverlay layerName={layerName} attribution={attribution} />}</div>;
}
*/
export default ControlOverlay;
