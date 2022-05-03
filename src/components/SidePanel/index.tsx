import * as React from 'react';
import {Panel, PanelType} from '@fluentui/react';
import './index.css'

interface SidePanelProps {
    isOpen: boolean;
    dismissPanel: () => void;
}

const SidePanel: React.FunctionComponent<SidePanelProps> = ({children, isOpen, dismissPanel}) => {

    return (
        <Panel
            className='SidePanel'
            headerText="Non-modal panel"
            // this prop makes the panel non-modal
            isBlocking={false}
            customWidth={'20%'}
            type={PanelType.customNear}
            isOpen={isOpen}
            onDismiss={dismissPanel}
            closeButtonAriaLabel="Close">
            <p>{children}</p>
        </Panel>
    );
};

export default SidePanel;