import * as React from "react";
import { CommandBar } from "@fluentui/react";
import "./index.css";
import { useMap } from "react-leaflet";

interface CommandBarProps {
    openImprint: () => void;
    openInfo: () => void;
}

const AppCommandBar: React.FunctionComponent<CommandBarProps> = ({ openImprint, openInfo }) => {
    const map = useMap();
    return (
        <div className={"CommandBar"}>
            <CommandBar
                translate={"no"}
                items={[
                    {
                        key: "zoomIn",
                        iconProps: { iconName: "Add" },
                        iconOnly: true,
                        name: "Zoom in",
                        ariaLabel: "Zoom in",
                        onClick: () => {
                            map.zoomIn();
                        },
                    },
                    {
                        key: "zoomOut",
                        iconProps: { iconName: "Remove" },
                        iconOnly: true,
                        name: "Zoom out",
                        ariaLabel: "Zoom out",
                        onClick: () => {
                            map.zoomOut();
                        },
                    },
                    {
                        key: "info",
                        text: "Info",
                        ariaLabel: "Info",
                        iconOnly: false,
                        iconProps: { iconName: "Info" },
                        onClick: openInfo,
                    },
                    {
                        key: "impressum",
                        iconProps: { iconName: "DecisionSolid" },
                        iconOnly: false,
                        name: "Impressum",
                        text: "Impressum",
                        onClick: openImprint,
                    },
                ]}
                ariaLabel="Use left and right arrow keys to navigate between commands"
            />
        </div>
    );
};

export default AppCommandBar;
