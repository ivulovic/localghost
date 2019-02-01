import React from "react";
import {Note} from "./Note";

export const NoteList = (props) =>(
  <div>
    {props.notes.map((note) => <Note key={note.id}
                                        id={note.id}
                                        title={note.title}
                                        description={note.description}
                                        author={note.author}
                                        taskId={props.taskId}
                                        onCreate={props.onCreate}
                                        onUpdate={props.onUpdate}
                                        onRemove={props.onRemove}/>)}
    {!Boolean(props.notes.length) && <p className="text-muted small-margin-top small-bottom-space">We couldn't find any note.</p>}
  </div>
);
