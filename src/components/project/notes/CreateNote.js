import React from "react";
import {TextField} from "@material-ui/core";

export class CreateNote extends React.Component {
  constructor(props){
    super(props);
    this.createNote = this.createNote.bind(this);
    this.newNote = React.createRef();
  }

  createNote(event){
    event.preventDefault();
    let note = this.newNote.current.value;
    if(note && note.trim()){
      this.props.onNoteCreation({author:"Ivan Vulovic", description:note.trim()});
      this.newNote.current.value = '';
    }
  }

  render(){
    return(
      <form onSubmit={this.createNote} className="bottom-space">
        <p className="color-gray form-section-title">Create new note</p>
        <TextField type="text" autoComplete="off" id="note" label="What is the note about?" fullWidth inputRef={this.newNote}/>
      </form>
    )
  }
}
