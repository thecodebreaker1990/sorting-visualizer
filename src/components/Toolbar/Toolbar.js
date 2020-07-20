import React, { Component } from 'react';
import classes from './Toolbar.module.css';

class Toolbar extends Component {
    render() {
        const sortControls = this.props.sortOptions.map(opt => {
            const classNames = [classes.Option, opt.key === this.props.selectedSort ? classes['Option--selected'] : ''];
            const sortLabel = opt.key === this.props.selectedSort ? opt.label : opt.key;
            return <div
                className={classNames.join(' ')} 
                key={opt.key} 
                onClick={() => this.props.selectSort(opt.key)}>
                    {sortLabel}
            </div>;
        });
        return <div className={classes.Toolbar}>
            { sortControls }
            <div className={classes.Action}>
                <div className={classes.Action__item} onClick={this.props.randomize}>Generate New Array</div>
                <div className={classes.Action__item} onClick={this.props.sort}>Sort!</div>
            </div>
        </div>;
    }
}

export default Toolbar;