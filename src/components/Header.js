import React from "react";
import {IoLogoFreebsdDevil} from "react-icons/io";
import {NavLink} from "react-router-dom";

export const Header = () => (
  <div className="overflow-auto full-width">
    <div className="header-logo">
      <NavLink to={"/"}>
        <IoLogoFreebsdDevil size={54} fill="#e53935"/>
        <span>demonello</span>
      </NavLink>
    </div>
  </div>
);
