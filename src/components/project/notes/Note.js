import React from "react";
import {RemoveControl} from "../shared/RemoveControl";
import {UpdateNote} from "./UpdateNote";

export class Note extends React.Component{

  render(){
     return  (
      <div className="bottom-space">
         <p className="note-title small-line-spacing standard-font-size text-justify small-bottom-space" onClick={()=>this.props.showNoteDetails(this.props.id)}>
          {this.props.title}
        </p>
       </div>
    );

  }
}
