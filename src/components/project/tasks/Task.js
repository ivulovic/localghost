import React from "react";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import {UpdateDeleteControls} from "../controls/UpdateDeleteControls";

export class Task extends React.Component {
  constructor(props){
    super(props);
    this.confirmRemoval = this.confirmRemoval.bind(this);
    this.confirmUpdating = this.confirmUpdating.bind(this);
  }
  confirmRemoval(id){
    this.props.onTaskRemoval(id);
  }
  confirmUpdating(id, description){
    this.props.onTaskDescriptionUpdate(id, description);
  }
  render(){
    return (
      <li>
        <UpdateDeleteControls mode="icon" topic="task" onRemove={this.confirmRemoval} onUpdate={this.confirmUpdating} id={this.props.id} description={this.props.description}/>
        <FormControlLabel className={this.props.status ? 'checkbox-done' : 'color-gray'} control={<Checkbox checked={this.props.status} onChange={this.props.onTaskStatusUpdate}  color="default" value="checkedG" />} label={this.props.description} />
      </li>
    )
  }
};
