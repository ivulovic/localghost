import React from "react";
import {UpdateNote} from "./UpdateNote";
import {RemoveControl} from "../shared/RemoveControl";

export class NoteList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      expanded: []
    }
  }

  toggleRowExpansion = (id) => {
    this.setState({
      ...this.state,
      expanded: this.state.expanded.indexOf(id) >= 0 ? this.state.expanded.filter(itemId=> itemId !== id) : [...this.state.expanded, id]
    });  };

  handleRemove = (key, obj, taskId, noteId) => {
    this.setState({activeNote: {}});
    this.props.onRemove(key, obj, taskId, noteId);
  };

  render(){
    return (
      <div>
          {this.props.notes.map((note) => (
            <div  key={note.id}>
              <p className="note-title small-line-spacing standard-font-size text-justify small-bottom-space" onClick={()=>this.toggleRowExpansion(note.id)}>{note.title}</p>
              {this.state.expanded.indexOf(note.id)>=0 && (
                <div>
                  <p className="text-muted small-bottom-space">Description:</p>
                  <p className="standard-font-size color-gray text-justify small-line-spacing">
                    {note.description}
                  </p>
                  <div className="small-bottom-space">
                    <UpdateNote mode="default"  taskId={this.props.taskId} title={note.title} id={note.id} description={note.description} onUpdate={this.props.onUpdate}/>
                    <RemoveControl mode="default" taskId={this.props.taskId}  topic="note" id={note.id} onRemove={this.handleRemove}/>
                  </div>
                </div>
              )}
            </div>
          ))}
        {!Boolean(this.props.notes.length) && <p className="no-results-paragraph">We couldn't find any note.</p>}
      </div>
     );
  }
}
