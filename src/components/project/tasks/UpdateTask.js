import React from "react";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import {MdEdit} from "react-icons/md";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";

export class UpdateTask extends React.Component{

  constructor(props) {
    super(props);
    this.updatedTitle = React.createRef();
    this.updatedDescription = React.createRef();
    this.state = {
      updateDialogOpened: false
    }
  }

  openUpdateDialog = () => {
    this.setState({ updateDialogOpened: true });
  };

  closeUpdateDialog = () => {
    this.setState({ updateDialogOpened: false });
  };

  confirmUpdating = () => {
    if(this.updatedDescription.current && this.updatedDescription.current.value && this.updatedDescription.current.value.trim() && this.updatedTitle.current && this.updatedTitle.current.value && this.updatedTitle.current.value.trim()){
      if(this.updatedTitle.current.value.trim() !== this.props.title.trim() || this.updatedDescription.current.value.trim() !== this.props.description.trim()){
        this.props.onUpdate("tasks", {id:this.props.id, title: this.updatedTitle.current.value.trim(), description: this.updatedDescription.current.value.trim()}, this.props.taskId, this.props.id);
      }
      this.closeUpdateDialog();
    }
  };

  preventDefaultBehaviour = (event) => {
    event.preventDefault();
  };

  render(){
    return(
      <div className="inline-block small-bottom-space">

        {this.props.mode==='icon' && (
          <div className="inline-block">
            <Tooltip title="Update">
              <Button variant="outlined" className="icon-only-button no-radius" onClick={this.openUpdateDialog}><MdEdit size={20}/> </Button>
            </Tooltip>
          </div>
        )}

        {this.props.mode==='default' && (
          <div className="inline-block small-margin-top minimum-space-after">
            <Button className="no-radius color-gray" onClick={this.openUpdateDialog}><MdEdit size={20}/> &nbsp; Update</Button>
          </div>
        )}

        <Dialog open={this.state.updateDialogOpened} onClose={this.closeUpdateDialog} fullWidth maxWidth="lg">
          <DialogTitle id="form-dialog-title">UPDATE TASK</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are about to change task content with the new one.
            </DialogContentText>
            <form onSubmit={this.preventDefaultBehaviour}>
              <div className="bottom-space"/>
              <TextField autoFocus autoComplete="off" id="title" label="Title" type="text" defaultValue={this.props.title} fullWidth inputRef={this.updatedTitle}/>
              <div className="bottom-space"/>
              <TextField autoFocus autoComplete="off" multiline rows={5} id="description" label="Description" type="text" defaultValue={this.props.description} fullWidth inputRef={this.updatedDescription}/>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeUpdateDialog} color="primary"> Cancel </Button>
            <Button onClick={this.confirmUpdating} color="primary"> Save </Button>
          </DialogActions>
        </Dialog>

      </div>
    )
  }
}
