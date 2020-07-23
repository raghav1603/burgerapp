import React from 'react';
import burgerLogo from '../../assets/images/27.1 burger-logo.png.png';
import classes from './Logo.css'

const logo = (props) => (

    <div className={classes.Logo}>             {/* there was a problem implementing responsiveness to logo,
                                                 so it can be done using inline styling where 
                                                the height would be sent as props to this component*/}          
        <img src={burgerLogo} alt="chewtiya"/>
    </div>
)

export default logo