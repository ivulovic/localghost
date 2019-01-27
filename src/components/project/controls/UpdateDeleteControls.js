import React from "react";
import {TextField} from "@material-ui/core";
import {FaRegEdit} from "react-icons/fa";
import {FiTrash} from "react-icons/fi";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";

export class UpdateDeleteControls extends React.Component{

  constructor(props) {
    super(props);
    this.openRemoveDialog = this.openRemoveDialog.bind(this);
    this.closeRemoveDialog = this.closeRemoveDialog.bind(this);
    this.confirmRemoval = this.confirmRemoval.bind(this);
    this.openUpdateDialog = this.openUpdateDialog.bind(this);
    this.closeUpdateDialog = this.closeUpdateDialog.bind(this);
    this.confirmUpdating = this.confirmUpdating.bind(this);
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
  confirmRemoval(event){
    this.props.onRemove(this.props.id);
    this.closeRemoveDialog();
  }
  openUpdateDialog(){
    this.setState({ updateDialogOpened: true });
  }
  closeUpdateDialog(){
    this.setState({ updateDialogOpened: false });
  }
  confirmUpdating(){
    if(this.updatedDescription.current && this.updatedDescription.current.value && this.updatedDescription.current.value.trim()){
      this.props.onUpdate(this.props.id, this.updatedDescription.current.value.trim());
      this.closeUpdateDialog();
    }
  }

  render(){
    return(
      <div className="inline-block">

        {this.props.mode==='icon' && (
          <div className="inline-block minimum-space-after">
            <Button variant="outlined" className="icon-only-button no-radius" onClick={this.openRemoveDialog}><FiTrash/> </Button>
            <Button variant="outlined" className="icon-only-button no-radius" onClick={this.openUpdateDialog}><FaRegEdit/> </Button>
          </div>
        )}

        {this.props.mode==='default' && (
          <div className="inline-block small-margin-top">
            <Button variant="outlined" className="small-space-after no-radius color-gray" onClick={this.openRemoveDialog}><FiTrash/> &nbsp; Remove</Button>
            <Button variant="outlined" className="no-radius color-gray" onClick={this.openUpdateDialog}><FaRegEdit/> &nbsp; Update</Button>
          </div>
        )}

        <Dialog open={this.state.updateDialogOpened} onClose={this.closeUpdateDialog} fullWidth maxWidth="lg">
          <DialogTitle id="form-dialog-title">Update  {this.props.topic}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are about to change {this.props.topic} description with the new one.
            </DialogContentText>
            <div className="bottom-space"> </div>
            <TextField autoFocus autoComplete="off" id="name" label="Description" type="text" defaultValue={this.props.description} fullWidth inputRef={this.updatedDescription}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeUpdateDialog} color="primary"> Cancel </Button>
            <Button onClick={this.confirmUpdating} color="primary"> Save </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.removeDialogOpened} onClose={this.closeRemoveDialog} onClick={this.preventClose}>
          <DialogTitle id="alert-dialog-title">Remove {this.props.topic}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This means that your  {this.props.topic} will be removed forever.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeRemoveDialog} color="primary"> Cancel </Button>
            <Button onClick={this.confirmRemoval} color="primary" autoFocus> Confirm </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
