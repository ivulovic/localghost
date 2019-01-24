import React from "react";

export const ProjectListItem = (props) => (
  <li className="bottom-space">
    <p className="color-gray">{props.description}</p>
    <a target="_blank" href={props.link}  className="project-link small-line-spacing" >
      {props.link}
    </a>
  </li>
);
