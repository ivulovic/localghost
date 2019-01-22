import React from "react";
import {NavLink} from "react-router-dom";
import { FaGhost } from "react-icons/fa";
import SearchBox from "./SearchBox";
import {MdChevronLeft} from "react-icons/md";

export const Header = (props) => (
  <div className="overflow-auto dark-background full-width">
    <ul className="header-menu">
      <li>
        <button onClick={props.toggleDrawer} className="open-drawer-button"><MdChevronLeft size={30}/> </button>
      </li>
      <li>
        <NavLink activeClassName="activeLink" to="/">
          <span className="logo-text-header"><span className="logo-ghost-icon"><FaGhost size={25}/></span> localghost</span>
        </NavLink>
      </li>
      <li></li>
      {/*<SearchBox/>*/}
    </ul>
  </div>
);
