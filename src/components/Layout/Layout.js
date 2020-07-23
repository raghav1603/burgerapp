import React, { Component } from "react";
import Aux from '../../hoc/Auxi'
import Toolbar from '../Navigation/ToolBar/Toolbar'
import classes from './Layout.css'
import SideDrawer from '../Navigation/Sidedrawer/Sidedrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        })
    }
    render() {
        return (
            <Aux>
                {/* <div>toolbar,sidebar,backdrop</div> */}
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler }/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
export default Layout;