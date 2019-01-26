import React from "react";

export const ProjectLinkItem = (props) => (
  <li className="bottom-space">
    <a target="new" href={props.link}  className="small-line-spacing project-link" >
      Link
    </a>
    <span className="small-line-spacing color-gray">{props.description} </span>
  </li>
);
