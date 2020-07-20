import React from 'react';
import Grid from './Grid/Grid';

import classes from './GridContainer.module.css';

const gridContainer = React.forwardRef((props, ref) => {
    return <div className={classes.GridContainer} ref={ref}>
        {
            props.list.map((el, index) => {
                let sorted = props.currentSorted.indexOf(index) !== -1;
                let active = props.currentSwappers.indexOf(index) !== -1;
                let selected = props.currentSelectTwo.indexOf(index) !== -1;
                return <Grid 
                    number={el}
                    sorted={sorted}
                    active={active}
                    selected={selected}  
                    key={index} 
                />;
            })
        }
    </div>;
});

export default gridContainer;