import React from 'react';
import classes from './RangeSlider.module.css';

const rangeSlider = (props) => {
    return <div className={classes.RangeSliderContainer}>
        <input 
            type="range" 
            min={props.min} 
            max={props.max} 
            value={props.value}
            className={classes.RangeSlider}
            onChange={(event) => props.onInput(event.target.value)}
        />
    </div>;
}

export default rangeSlider;