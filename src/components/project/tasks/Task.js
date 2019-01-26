import React from "react";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import {FaRegEdit} from "react-icons/fa";
import {FiTrash} from "react-icons/fi";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import {TextField} from "@material-ui/core";

export class Task extends React.Component {
  constructor(props){
    super(props);
    this.openRemoveDialog = this.openRemoveDialog.bind(this);
    this.closeRemoveDialog = this.closeRemoveDialog.bind(this);
    this.confirmProjectRemoval = this.confirmProjectRemoval.bind(this);
    this.openUpdateDialog = this.openUpdateDialog.bind(this);
    this.closeUpdateDialog = this.closeUpdateDialog.bind(this);
    this.confirmUpdatingTask = this.confirmUpdatingTask.bind(this);
    this.updatedDescription = React.createRef();
    this.state = {
      removeDialogOpened:false,
      updateDialogOpened: false
    }
  }
  openRemoveDialog () {
    this.setState({ removeDialogOpened: true });
  };
  closeRemoveDialog () {
    this.setState({ removeDialogOpened: false });
  };
  confirmProjectRemoval(event){
    this.props.onTaskRemoval(this.props.id);
    this.closeRemoveDialog(event);
  }
  openUpdateDialog(){
    this.setState({ updateDialogOpened: true });
  }
  closeUpdateDialog(){
    this.setState({ updateDialogOpened: false });
  }
  confirmUpdatingTask(){
    if(this.updatedDescription.current && this.updatedDescription.current.value && this.updatedDescription.current.value.trim()){
      this.props.onDescriptionUpdate(this.props.id, this.updatedDescription.current.value.trim());
      this.closeUpdateDialog();
    }
  }
  render(){
    return (
      <li>
        <IconButton onClick={this.openRemoveDialog}> <FiTrash /> </IconButton>
        <IconButton onClick={this.openUpdateDialog}> <FaRegEdit /> </IconButton>
        <FormControlLabel className={this.props.status ? 'checkbox-done' : 'color-gray'} control={<Checkbox checked={this.props.status} onChange={this.props.onTaskStatusUpdate}  color="default" value="checkedG" />} label={this.props.description} />

        <Dialog open={this.state.updateDialogOpened} onClose={this.closeUpdateDialog} fullWidth maxWidth="lg">
          <DialogTitle id="form-dialog-title">Update Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are about to change task description with the new one.
            </DialogContentText>
            <div className="bottom-space"> </div>
            <TextField autoFocus autoComplete="off" id="name" label="Description" type="text" defaultValue={this.props.description} fullWidth inputRef={this.updatedDescription}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeUpdateDialog} color="primary"> Cancel </Button>
            <Button onClick={this.confirmUpdatingTask} color="primary"> Save </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.removeDialogOpened} onClose={this.closeRemoveDialog} onClick={this.preventClose}>
          <DialogTitle id="alert-dialog-title">Confirm Task Removal</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This means that your task will be removed forever.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeRemoveDialog} color="primary"> Cancel </Button>
            <Button onClick={this.confirmProjectRemoval} color="primary" autoFocus> Confirm </Button>
          </DialogActions>
        </Dialog>
      </li>
    )
  }
};
