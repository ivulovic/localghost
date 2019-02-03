import React from "react";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import {FaPlus} from "react-icons/fa";

export class CreateNote extends React.Component {
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
        'notes',
        {id:Math.floor(Math.random()*10000),
        status:'start',
        author:"Ivan Vulovic",
        title,
        description},
        this.props.taskId);
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

  preventDefaultBehaviour = (event) => {
    event.preventDefault();
  };

  render(){
    return(
      <div className="inline-block">
        <Button className="flat-button" onClick={this.openDialog}><FaPlus size={22} color="#01B3E3"/> &nbsp;&nbsp; <span className="color-gray">New Note</span></Button>
        <div className="small-bottom-space"/>
        <Dialog maxWidth='md' fullWidth open={this.state.dialogOpened} onClose={this.closeDialog}>
          <DialogTitle id="form-dialog-title">Create Note</DialogTitle>
          <DialogContent>
            <form onSubmit={this.preventDefaultBehaviour}>
              <TextField autoFocus autoComplete="off" id="title" label="Title" type="text" fullWidth inputRef={this.title}/>
              <div className="bottom-space"/>
              <TextField autoComplete="off" id="description" label="Description" type="text" fullWidth inputRef={this.description} multiline rows="5"/>
            </form>
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
