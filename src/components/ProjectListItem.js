import React from "react";
import {IoMdLink} from "react-icons/io";
import {FaLink} from "react-icons/fa";

export const ProjectListItem = (props) => (
  <li className="bottom-space">
    <a target="_blank" href={props.link}  className="small-line-spacing project-link" >
      <FaLink size={14}/> Link
    </a>
    <span className="color-gray">{props.description} </span>
  </li>
);
