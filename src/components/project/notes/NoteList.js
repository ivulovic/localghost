import React from "react";
import {Note} from "./Note";
import {UpdateNote} from "./UpdateNote";
import {RemoveControl} from "../shared/RemoveControl";

export class NoteList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      activeNote: {}
    }
  }



  showNoteDetails = (id) => {
    console.log(id)
    this.setState({activeNote: this.props.notes.filter(note => note.id === id)[0]})
  }
  render(){
    return (
      <div>
        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 no-padding">
          {this.props.notes.map((note) => (<p key={note.id} className="note-title small-line-spacing standard-font-size text-justify small-bottom-space" onClick={()=>this.showNoteDetails(note.id)}>{note.title}</p>))}
        </div>
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 no-padding">
          { Object.keys(this.state.activeNote).length !== 0 ? (
            <div>
              <p className="text-muted">Title:</p>
              <p className="standard-font-size color-gray text-justify small-line-spacing small-bottom-space">
                {this.state.activeNote.title}
              </p>
              <p className="text-muted">Description:</p>
              <p className="standard-font-size color-gray text-justify small-line-spacing">
                {this.state.activeNote.description}
              </p>
              <div>
                <UpdateNote mode="default"  taskId={this.props.taskId} title={this.state.activeNote.title} id={this.state.activeNote.id} description={this.state.description} onUpdate={this.props.onUpdate}/>
                <RemoveControl mode="default" taskId={this.props.taskId}  topic="note" id={this.state.activeNote.id} onRemove={this.props.onRemove}/>
              </div>
            </div>
          ) : ''}
        </div>
        {!Boolean(this.props.notes.length) && <p className="no-results-paragraph">We couldn't find any note.</p>}
      </div>
    );
  }
}
