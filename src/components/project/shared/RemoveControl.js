import React from "react";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import {MdDelete} from "react-icons/md";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";

export class RemoveControl extends React.Component{

  constructor(props) {
    super(props);
    this.openRemoveDialog = this.openRemoveDialog.bind(this);
    this.closeRemoveDialog = this.closeRemoveDialog.bind(this);
    this.confirmRemoval = this.confirmRemoval.bind(this);
    this.state = {
      removeDialogOpened:false,
    }
  }
  openRemoveDialog () {
    this.setState({ removeDialogOpened: true });
  };
  closeRemoveDialog () {
    this.setState({ removeDialogOpened: false });
  };
  confirmRemoval(event){
    this.props.onRemove(this.props.topic+"s", {id:this.props.id}, this.props.taskId, this.props.id);
    this.closeRemoveDialog();
  }
  render(){
    return(
      <div className="inline-block">

        {this.props.mode==='icon' && (
          <div className="inline-block minimum-space-after">
            <Tooltip title="Remove">
              <Button variant="outlined" className="icon-only-button no-radius" onClick={this.openRemoveDialog}><MdDelete size={24} color="#e53935"/> </Button>
            </Tooltip>
          </div>
        )}

        {this.props.mode==='default' && (
          <div className="inline-block small-margin-top minimum-space-after">
            <Button className="small-space-after no-radius color-gray flat-button" onClick={this.openRemoveDialog}><MdDelete size={20} color="#e53935"/> &nbsp; Remove</Button>
          </div>
        )}

        <Dialog open={this.state.removeDialogOpened} onClose={this.closeRemoveDialog} onClick={this.preventClose}>
          <DialogTitle id="alert-dialog-title">REMOVE {this.props.topic.toUpperCase()}</DialogTitle>
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
