import React from 'react';
import './sideNav.scss';
import { NavLink } from 'react-router-dom';

function SideNav (props: any) {

    return (
        <div  className="sidenav__container">
            <ul className="sidenav__subcontainer">
                <NavLink exact to="/" className="sidenav__list" activeClassName="active"> Home</NavLink>
                <NavLink  exact to="/transfer" className="sidenav__list" activeClassName="active"> Transfer funds</NavLink>
                <NavLink  exact to="/payments" className="sidenav__list" activeClassName="active">View Transfers</NavLink>
            </ul>
        </div>
    )
}

export default SideNav;