import React from 'react';
import classes from './Grid.module.css';

const grid = ({ number, sorted, active, selected }) => {
    const styleObjet = {
        height: `${number * 5}px`,
    }
    let classList = [classes.Grid];
    if(sorted) {
        classList.push(classes['--sorted']);
    }
    if(active) {
        classList.push(classes['--active']);
    }
    if(selected) {
        classList.push(classes['--selected']);
    }
    return <div className={classList.join(' ')} style={styleObjet}>
        { number }
    </div>
}

export default grid;