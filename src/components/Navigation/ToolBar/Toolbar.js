import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavItems/NavItems';
import ToggleDrawer from '../Sidedrawer/DrawerToggle/DrawerToggle'
import classes from './Toolbar.css';


const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <ToggleDrawer clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
)

export default toolbar