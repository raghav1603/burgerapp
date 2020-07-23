import React from 'react';
import NavItem from '../NavItem/NavItem'
import classes from './NavItems.css'

const navItems = (props) => (
    <ul className={classes.NavItems}>
        <NavItem link="/" exact > Burger builder</NavItem>
        <NavItem link="/order"> Orders</NavItem>
        <NavItem link="/auth"> Authenticate</NavItem>
    </ul>
)

export default navItems