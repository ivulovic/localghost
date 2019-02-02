import React from "react";
import {RemoveControl} from "../shared/RemoveControl";
import {UpdateNote} from "./UpdateNote";
import ExpansionPanel from "@material-ui/core/es/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/es/ExpansionPanelSummary/ExpansionPanelSummary";
import {FaChevronDown} from "react-icons/fa";
import ExpansionPanelDetails from "@material-ui/core/es/ExpansionPanelDetails/ExpansionPanelDetails";
export class Note extends React.Component{
  render(){
     return  (
      <ExpansionPanel className="no-padding no-shadow">
        <ExpansionPanelSummary className={"no-padding"} expandIcon={<FaChevronDown size={13}/>}>
          <div>
            <p className="note-title standard-font-size">{this.props.title}</p>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={"no-padding no-margin"}>
          <div>
            <p className="text-muted small-bottom-space">Description:</p>
            <p className="color-gray small-line-spacing text-justify standard-font-size">{this.props.description}</p>
            <div className="small-bottom-space"> </div>
            <UpdateNote mode="default"  taskId={this.props.taskId} title={this.props.title} id={this.props.id} description={this.props.description} onUpdate={this.props.onUpdate}/>
            <RemoveControl mode="default" taskId={this.props.taskId}  topic="note" id={this.props.id} onRemove={this.props.onRemove}/>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );

  }
}
