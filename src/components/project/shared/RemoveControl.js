import React from "react";
import {FiTrash} from "react-icons/fi";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";

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
    this.props.onRemove(this.props.topic+"s", {id:this.props.id});
    this.closeRemoveDialog();
  }
  render(){
    return(
      <div className="inline-block">

        {this.props.mode==='icon' && (
          <div className="inline-block minimum-space-after">
            <Button variant="outlined" className="icon-only-button no-radius" onClick={this.openRemoveDialog}><FiTrash/> </Button>
          </div>
        )}

        {this.props.mode==='default' && (
          <div className="inline-block small-margin-top">
            <Button variant="outlined" className="small-space-after no-radius color-gray" onClick={this.openRemoveDialog}><FiTrash/> &nbsp; Remove</Button>
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
