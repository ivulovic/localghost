import React from "react";
import {NavLink} from "react-router-dom";

export const ColorBox = (props) => (
  <NavLink to={"/sources/"+props.id}>
    <div className={"color-box relative "+props.theme}>
      <p className="color-box-counter">{props.count}</p>
      <p className="color-box-title">{props.title}</p>
    </div>
  </NavLink>
);
