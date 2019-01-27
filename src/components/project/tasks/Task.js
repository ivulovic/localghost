import React from "react";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import {RemoveControl} from "../shared/RemoveControl";
import {UpdateDescription} from "../common/UpdateDescription";

export const Task = (props)=>  (
  <li>
    <RemoveControl mode="icon" topic="task" id={props.id} onRemove={props.onRemove}/>
    <UpdateDescription mode="icon" topic="task" id={props.id} description={props.description} onUpdate={props.onUpdate}/>
    <FormControlLabel className={props.status ? 'checkbox-done' : 'color-gray'} control={<Checkbox checked={props.status} onChange={()=>props.onUpdate('tasks', {id:props.id, status:!props.status})} color="default" value="checkedG" />} label={props.description} />
  </li>
);
