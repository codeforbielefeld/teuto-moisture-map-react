import * as React from 'react';
import {CommandBar, IButtonProps, ICommandBarItemProps} from '@fluentui/react';
import "./index.css"

const overflowProps: IButtonProps = { ariaLabel: 'More commands' };

const AppCommandBar: React.FunctionComponent = () => {
    return (
        <div className={"CommandBar"}>
            <CommandBar translate={"no"}
                items={_items}
                overflowItems={_overflowItems}
                overflowButtonProps={overflowProps}
                farItems={_farItems}
                ariaLabel="Use left and right arrow keys to navigate between commands"
            />
        </div>
    );
};

const _items: ICommandBarItemProps[] = [
    {
        key: 'newItem',
        text: 'New',
        cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
        iconProps: { iconName: 'Add' },
        subMenuProps: {
            items: [
                {
                    key: 'emailMessage',
                    text: 'Email message',
                    iconProps: { iconName: 'Mail' }
                    //['data-automation-id']: 'newEmailButton', // optional
                },
                {
                    key: 'calendarEvent',
                    text: 'Calendar event',
                    iconProps: { iconName: 'Calendar' },
                },
            ],
        },
    },
    {
        key: 'contact',
        text: 'Contact',
        iconProps: { iconName: 'Contact' },
        href: 'https://www.google.com',
    },
    {
        key: 'info',
        text: 'Info',
        iconProps: { iconName: 'Info' },
        onClick: () => console.log('Info'),
    },
    {
        key: 'Aboutus',
        text: 'About us',
        iconProps: { iconName: 'People' },
        onClick: () => console.log('People'),
    },
];

const _overflowItems: ICommandBarItemProps[] = [
    { key: 'aboutlorawan', text: 'About Lorawan', onClick: () => console.log('InternetSharing'), iconProps: { iconName: 'InternetSharing' } },
    { key: 'howto', text: 'Howto setup a new sensor', onClick: () => console.log('how to'), iconProps: { iconName: 'TextDocument' } },
    { key: 'rename', text: 'Rename...', onClick: () => console.log('Rename'), iconProps: { iconName: 'Edit' } },
];

const _farItems: ICommandBarItemProps[] = [
    {
        key: 'tile',
        text: 'Grid view',
        // This needs an ariaLabel since it's icon-only
        ariaLabel: 'Grid view',
        iconOnly: true,
        iconProps: { iconName: 'Tiles' },
        onClick: () => console.log('Tiles'),
    },
    {
        key: 'info',
        text: 'Info',
        // This needs an ariaLabel since it's icon-only
        ariaLabel: 'Info',
        iconOnly: true,
        iconProps: { iconName: 'Info' },
        onClick: () => console.log('Info'),
    },
];

export default AppCommandBar;
