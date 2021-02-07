import React from 'react';
import Actions from "./SidebarActions/SidebarActions";
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron-right.svg";

import classes from "./Sidebar.module.css";

const ACTIONS = [
    {
        key: "create",
        label: "Create"
    },
    {
        key: "sort",
        label: "Sort"
    }
];

const sidebar = (props) => {
    let iconClasses = ["icon", "icon--lg"];
    if(props.show) iconClasses.push("rotate-180");
    iconClasses = iconClasses.join(" ");

    const handleActionClick = (actionItem) => {
        switch (actionItem) {
            case 'sort':
                props.sort();
                props.toggled();
                break;
            case 'create':
                props.randomize();
                break;
            default:
                break;
        }
    };

    return <div className={classes.SidebarControl}>
        <div 
            className={classes.SidebarControl__el}
            onClick={props.toggled}
        >
            <ChevronIcon className={iconClasses} />
        </div>
        <div style={{
            position: "fixed",
            bottom: "6rem",
            left: "5.5rem"
        }}>
            <Actions visible={props.show} items={ACTIONS} clicked={handleActionClick} />
        </div>
    </div>;
}

export default sidebar;