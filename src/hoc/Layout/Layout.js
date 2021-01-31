import React from 'react';
import classes from './Layout.module.css';

const layout = props => {
    return <div className={classes.Layout}>
        <header className={classes.Header}>
            <div className={classes.Header__title}>VisualSort</div>
            { props.toolbar }
        </header>
        <aside className={classes.Sidebar}>
            { props.sidebar }
        </aside>
        <main>
            { props.children }
        </main>
        <footer className={classes.Footer}>
            This is footer control
        </footer>
    </div>;
}

export default layout;