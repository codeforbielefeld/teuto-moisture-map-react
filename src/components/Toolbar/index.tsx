import { CommandBarButton, IOverflowSetItemProps, OverflowSet } from '@fluentui/react';
import * as React from 'react';
import "./index.css"

const noOp = () => undefined;

const onRenderItemStyles = {
    root: {padding: '10px'},
};
const onRenderOverflowButtonStyles = {
    root: {padding: '10px'},
    menuIcon: {fontSize: '16px'},
};

const onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
    return (
        <CommandBarButton
            role="menuitem"
            aria-label={item.name}
            styles={onRenderItemStyles}
            iconProps={{iconName: item.icon}}
            onClick={item.onClick}
        />
    );
};

const onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
    return (
        <CommandBarButton
            role="menuitem"
            title="More items"
            styles={onRenderOverflowButtonStyles}
            menuIconProps={{iconName: 'More'}}
            menuProps={{items: overflowItems!}}
        />
    );
};

interface ToolbarProps {
    zoomIn?: () => void;
    zoomOut?: () => void;
    openPanel: () => void;
}


export const Toolbar: React.FunctionComponent<ToolbarProps> = ({zoomIn, zoomOut, openPanel}) => {
    return (

        <div className={"Toolbar"}>
            <OverflowSet
                aria-label="Vertical Example"
                role="menubar"
                vertical
                items={[
                    {
                        key: 'item1',
                        icon: 'Add',
                        name: 'Zoom in',
                        ariaLabel: 'New. Use left and right arrow keys to navigate',
                        onClick: zoomIn || noOp,
                    },
                    {
                        key: 'item11',
                        icon: 'Remove',
                        name: 'Zoom out',
                        ariaLabel: 'New. Use left and right arrow keys to navigate',
                        onClick: zoomOut|| noOp,
                    },
                    {
                        key: 'item2',
                        icon: 'AddBookmark',
                        name: 'Link 2',
                        onClick: openPanel,
                    },
                    {
                        key: 'item3',
                        icon: 'Share',
                        name: 'Link 3',
                        onClick: noOp,
                    },
                ]}
                overflowItems={[
                    {
                        key: 'item4',
                        icon: 'Mail',
                        name: 'Overflow Link 1',
                        onClick: noOp,
                    },
                    {
                        key: 'item5',
                        icon: 'Calendar',
                        name: 'Overflow Link 2',
                        onClick: noOp,
                    },
                ]}
                onRenderOverflowButton={onRenderOverflowButton}
                onRenderItem={onRenderItem}
            />
        </div>
    );
};


export default Toolbar;