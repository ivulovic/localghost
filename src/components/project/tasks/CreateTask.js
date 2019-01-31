import React from "react";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";

export class CreateTask extends React.Component {
  constructor(props){
    super(props);
    this.create = this.create.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.state = {
      dialogOpened: false
    };
    this.title = React.createRef();
    this.description = React.createRef();
  }

  create(event){
    event.preventDefault();
    let title = this.title.current.value.trim();
    let description = this.description.current.value.trim();
    if(title && description){
      this.props.onCreate(
        'tasks',
        { id:Math.floor(Math.random()*10000),
          project:"Projects 532",
          status:'start',
          notes:[],
          categories:[],
          assigner: {id:12131311, avatar:'https://material-ui.com/static/images/avatar/7.jpg'},
          assignee:  {id:12323331, avatar:'https://material-ui.com/static/images/avatar/4.jpg'},
          title, description});
      this.description.current.value = '';
      this.title.current.value = '';
      this.closeDialog();
    }
  }

  openDialog(){
    this.setState({dialogOpened: true})
  }

  closeDialog(){
    this.setState({dialogOpened: false})
  }

  render(){
    return(
      <div>
        <Button variant="outlined" size="large" className="large-button" onClick={this.openDialog}>
         New Task
        </Button>
        <Dialog maxWidth='md' fullWidth open={this.state.dialogOpened} onClose={this.closeDialog}>
          <DialogTitle id="form-dialog-title">Create Task</DialogTitle>
          <DialogContent>
            <TextField autoFocus autoComplete="off" id="title" label="Title" type="text" fullWidth inputRef={this.title}/>
            <div className="bottom-space"></div>
            <TextField autoComplete="off" id="description" label="Description" type="text" fullWidth inputRef={this.description} multiline rows="5"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary"> Cancel </Button>
            <Button onClick={this.create} color="primary"> Save </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
