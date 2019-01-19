import React from "react";
import {NavLink} from "react-router-dom";
import logo from '../img/ghost.png';

export const Menu = () => (
  <div className="overflow-auto dark-background">
    <ul className="menu">
      <li>
        <NavLink exact activeClassName="activeLink" to="/">
          <img src={logo} className="logo" alt="logo" />
          <strong>localghost</strong>
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="activeLink" to="/other">Other</NavLink>
      </li>
      <li>
        <NavLink activeClassName="activeLink" to="/not-found">Not Found</NavLink>
      </li>
    </ul>
  </div>
);
