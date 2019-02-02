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
    if(this.updatedDescription.current && this.updatedDescription.current.value && this.updatedDescription.current.value.trim()){
      if(this.updatedDescription.current.value.trim() !== this.props.description.trim()){
        this.props.onUpdate("tasks", {id:this.props.id, description: this.updatedDescription.current.value.trim()});
      }
      this.closeUpdateDialog();
    }
  };

  render(){
    return(
      <div className="inline-block">

        {this.props.mode==='icon' && (
          <div className="inline-block">
            <Tooltip title="Update">
              <Button variant="outlined" className="icon-only-button no-radius" onClick={this.openUpdateDialog}><MdEdit size={20}/> </Button>
            </Tooltip>
          </div>
        )}

        {this.props.mode==='default' && (
          <div className="inline-block small-margin-top minimum-space-after">
            <Button variant="outlined" className="no-radius color-gray" onClick={this.openUpdateDialog}><MdEdit size={20}/> &nbsp; Update</Button>
          </div>
        )}

        <Dialog open={this.state.updateDialogOpened} onClose={this.closeUpdateDialog} fullWidth maxWidth="lg">
          <DialogTitle id="form-dialog-title">UPDATE TASK</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are about to change task description with the new one.
            </DialogContentText>
            <div className="bottom-space"> </div>
            <form onSubmit={this.confirmUpdating}>
              <TextField autoFocus autoComplete="off" multiline rows={5} id="name" label="Description" type="text" defaultValue={this.props.description} fullWidth inputRef={this.updatedDescription}/>
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
