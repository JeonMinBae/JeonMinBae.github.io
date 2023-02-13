import React from 'react';
import {Drawer} from "@mui/material";


export interface ISideMenuProps {
    //children?: React.ReactNode,
}

const SideMenu = ({}: ISideMenuProps) => {

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    return (
        <aside>
            <button onClick={toggleDrawer("left", true)}>{"MENU"}</button>
            <Drawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
            >
                {
                    <ul>
                        <li><button>만드는 중</button></li>
                    </ul>
                }
            </Drawer>
        </aside>
    );
};


SideMenu.defaultProps = {};

export default SideMenu;