import React from "react";
import {RemoveControl} from "../shared/RemoveControl";
import {UpdateDescription} from "../common/UpdateDescription";

export const Note = (props) => (
  <li className="bottom-space">
    <p className="label">{props.author}</p>
    <p className="color-gray">{props.description}</p>
    <RemoveControl mode="default" topic="note" id={props.id} onRemove={props.onRemove}/>
    <UpdateDescription topic="note" mode="default" id={props.id} description={props.description} onUpdate={props.onUpdate}/>
  </li>
);
