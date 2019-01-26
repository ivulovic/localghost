import React from "react";
import {TextField} from "@material-ui/core";

export class CreateTask extends React.Component {
  constructor(props){
    super(props);
    this.createTask = this.createTask.bind(this);
    this.newTask = React.createRef();
  }

  createTask(event){
    event.preventDefault();
    let task = this.newTask.current.value;
    if(task && task.trim()){
      this.props.onTaskCreation(task.trim());
      this.newTask.current.value = '';
    }
  }

  render(){
    return(
      <form onSubmit={this.createTask} className="bottom-space">
        <p className="color-gray form-section-title">Create new task</p>
        <TextField type="text" autoComplete="off" id="task" label="What is the task about?" fullWidth inputRef={this.newTask}/>
      </form>
    )
  }
}
