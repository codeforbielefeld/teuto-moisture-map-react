import * as React from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
    direction: "rtl",
});

export default function VerticalSlider() {
    const [value, setValue] = useState(0);

    const getValue = () => {
        return value;
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setValue(110 - (newValue as number));
    };
    return (
        <div style={{ zIndex: 1000, position: "absolute", left: "50px", bottom: "10px", width: "40px" }}>
            <p style={{ textAlign: "left" }}>
                {value} bis {value + 10} in cm
            </p>
            <div style={{ height: "300px" }}>
                <Slider
                    aria-label="Temperature"
                    orientation="vertical"
                    valueLabelDisplay="off"
                    onChange={handleSliderChange}
                    defaultValue={110} //muss an max angepasst sein
                    track="inverted"
                    marks
                    step={10}
                    min={10}
                    max={110}
                />
            </div>
        </div>
    );
}
