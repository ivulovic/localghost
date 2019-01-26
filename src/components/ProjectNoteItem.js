import React from "react";

export const ProjecNoteItem = (props) => (
  <li className="bottom-space">
    <p className="label">{props.author}</p>
    <p className="color-gray">{props.description}</p>
  </li>
);
