import * as React from "react";
import { Panel, PanelType } from "@fluentui/react";

interface SidePanelProps {
    children: JSX.Element;
    isOpen: boolean;
    dismissPanel: () => void;
}

const SidePanel: React.FunctionComponent<SidePanelProps> = ({ children, isOpen, dismissPanel }) => (
    <Panel
        className="SidePanel"
        isBlocking={true}
        isLightDismiss={true}
        type={PanelType.customNear}
        customWidth={"600px"}
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
    >
        {children}
    </Panel>
);

export default SidePanel;
