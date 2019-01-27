import React from "react";
import {UpdateDeleteControls} from "../controls/UpdateDeleteControls";

export const Note = (props) => (
  <li className="bottom-space">
    <p className="label">{props.author}</p>
    <p className="color-gray">{props.description}</p>
    <UpdateDeleteControls topic="note" mode="default" id={props.id} description={props.description} onRemove={props.onNoteRemoval} onUpdate={props.onNoteDescriptionUpdate}/>
  </li>
);
