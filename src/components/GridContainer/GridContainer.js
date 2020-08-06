import React from 'react';
import Grid from './Grid/Grid';

import classes from './GridContainer.module.css';

const gridContainer = React.forwardRef((props, ref) => {
    return <div className={classes.GridContainer} ref={ref}>
        {
            props.list.map((el) => {
                let sorted = props.currentSorted.indexOf(el) !== -1;
                let active = props.currentSwappers.indexOf(el) !== -1;
                let selected = props.currentSelectTwo.indexOf(el) !== -1;
                return <Grid
                    styleObject={props.styleMap[el]} 
                    number={el}
                    sorted={sorted}
                    active={active}
                    selected={selected}  
                    key={el} 
                />;
            })
        }
    </div>;
});

export default gridContainer;