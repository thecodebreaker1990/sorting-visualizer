import React from 'react';
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron-right.svg";

import classes from "./Sidebar.module.css";

const sidebar = (props) => {
    return <div className={classes.SidebarControl}>
        <div className={classes.SidebarControl__el}>
            <ChevronIcon style={{
                color: 'white',
                height: '4em',
                width: '4em'
            }}/>
        </div>
    </div>;
}

export default sidebar;