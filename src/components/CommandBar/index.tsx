import * as React from "react";
import { useState } from "react";
import { CommandBar } from "@fluentui/react";
import "./index.css";
//Beispiele für Icons:  https://github.com/OfficeDev/office-ui-fabric-core/blob/master/src/data/icons.json
interface CommandBarProps {
    zoomIn?: () => void;
    zoomOut?: () => void;
    openImprint: () => void;
    openInfo: () => void;
    openOverlay?: () => void;
}

const AppCommandBar: React.FunctionComponent<CommandBarProps> = ({
    zoomIn,
    zoomOut,
    openImprint,
    openInfo,
    openOverlay,
}) => (
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
                    onClick: zoomIn,
                },
                {
                    key: "zoomOut",
                    iconProps: { iconName: "Remove" },
                    iconOnly: true,
                    name: "Zoom out",
                    ariaLabel: "Zoom out",
                    onClick: zoomOut,
                },
                {
                    key: "info",
                    text: "Info",
                    // This needs an ariaLabel since it's icon-only
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
                {
                    key: "ansicht",
                    iconProps: { iconName: "MapLayers" },
                    iconOnly: false,
                    name: "Ansicht ändern",
                    onClick: openOverlay,
                },
            ]}
            ariaLabel="Use left and right arrow keys to navigate between commands"
        />
    </div>
);

export default AppCommandBar;
