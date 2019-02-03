import React from "react";
import {NavLink} from "react-router-dom";
import {GoRuby} from "react-icons/go";

export const Header = () => (
  <div className="overflow-auto full-width">
    <div className="header-logo">
      <NavLink to={"/"}>
        <div className="inline-block logo-icon">
          <GoRuby size={64} fill="#e53935"/>
        </div>
        <div className="inline-block logo-text">
          <span className="logo-text-primary">Ruby</span>
          <span className="logo-text-secondary">Bring Structure to your work</span>
        </div>
        <div className="clear"/>
      </NavLink>
    </div>
  </div>
);
