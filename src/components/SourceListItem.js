import React from "react";

export const SourceListItem = (props) => (
  <li className="bottom-space">
    <p className="color-gray">{props.description}</p>
    <a target="_blank" href={props.link}  className="source-link small-line-spacing" >
      {props.link}
    </a>
  </li>
);
