import React from "react";

import classes from "./SidebarActions.module.css";

const sidebarActions = props => {
    let actionEl = null;
    if(props.visible) {
        actionEl = props.items.map(action => {
            return (
                <div 
                    className={[classes.Actions__item, "cursor-pointer"].join(" ")}
                    onClick={() => props.clicked(action.key)}>
                    { action.label }
                </div>
            );
        });
    }
    return <div className={[classes.Actions, props.visible ? classes["Actions--visible"] : ""].join(" ")}>
        { actionEl }
    </div>;
};

export default sidebarActions;