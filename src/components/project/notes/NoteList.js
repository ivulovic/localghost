import React from "react";
import {Note} from "./Note";

export const NoteList = (props) =>(
  <ul className="project-items-list">
    {props.notes.map((note, i) => <Note key={i} 
                                        id={note.id}
                                        author={note.author}
                                        description={note.description}
                                        onNoteDescriptionUpdate={props.onNoteDescriptionUpdate} 
                                        onNoteRemoval={props.onNoteRemoval}  />)}
    {!Boolean(props.notes.length) && <li className="text-muted">We couldn't find any note.</li>}
  </ul>
);