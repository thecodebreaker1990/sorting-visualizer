import React, { Suspense } from 'react';
import classes from "./Icon.module.css";

const icon = props => {
    const DynamicIcon = React.lazy(() => import(`../../assets/icons/${props.id}.svg`));
    return <Suspense fallback={<div>Loading...</div>}>
        <div className={classes.Icon}><DynamicIcon /></div>
    </Suspense> 
};

export default icon;

