import { FC } from "react";
import Slider from "@mui/material/Slider";

type sliderProps = {
    setDepthValue: React.Dispatch<React.SetStateAction<number>>;
    depthValue: number;
};

const VerticalSlider: FC<sliderProps> = ({ setDepthValue, depthValue }) => {
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setDepthValue(max - (newValue as number));
    };
    const max = 200; //maximale Tiefe
    return (
        <div style={{ zIndex: 1000, position: "absolute", left: "50px", bottom: "20px", width: "40px" }}>
            <p style={{ textAlign: "left" }}>
                {depthValue} bis {depthValue + 10} in cm
            </p>
            <div style={{ height: "300px" }}>
                <Slider
                    aria-label="Temperature"
                    orientation="vertical"
                    valueLabelDisplay="off"
                    onChange={handleSliderChange}
                    defaultValue={max}
                    track="inverted"
                    marks
                    step={10}
                    min={10}
                    max={max}
                />
            </div>
        </div>
    );
};
export default VerticalSlider;
