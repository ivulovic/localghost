import {Task} from "./Task";
import React from "react";

export const TaskList = (props) =>(
  <ul className="project-items-list">
    {props.tasks.map((task, i) => <Task key={i} id={task.id} description={task.description} status={task.status} onDescriptionUpdate={props.onDescriptionUpdate} onTaskRemoval={props.onTaskRemoval} onTaskStatusUpdate={()=>props.onTaskStatusUpdate(task.id)} />)}
  </ul>
);
