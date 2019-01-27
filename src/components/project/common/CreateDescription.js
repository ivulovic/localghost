import React from "react";
import {TextField} from "@material-ui/core";

export class CreateDescription extends React.Component {
  constructor(props){
    super(props);
    this.create = this.create.bind(this);
    this.newDescription = React.createRef();
  }

  create(event){
    event.preventDefault();
    let description = this.newDescription.current.value;
    if(description && description.trim()){
      switch (this.props.topic) {
        case "task":
          this.props.onCreate('tasks', {description:description.trim()});
          break;
        case "note":
          this.props.onCreate('notes', {author:"Ivan Vulovic", description:description.trim()});
          break;
        default: break;
      }
      this.newDescription.current.value = '';
    }
  }

  render(){
    return(
      <form onSubmit={this.create} className="bottom-space">
        <p className="color-gray form-section-title">New {this.props.topic}</p>
        <TextField type="text" autoComplete="off" id="note" label={"What is this "+this.props.topic+" about?"} fullWidth inputRef={this.newDescription}/>
      </form>
    )
  }
}
