import React from "react";
import {TextField} from "@material-ui/core";
import {FaRegEdit} from "react-icons/fa";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";

export class UpdateDescription extends React.Component{

  constructor(props) {
    super(props);
    this.openUpdateDialog = this.openUpdateDialog.bind(this);
    this.closeUpdateDialog = this.closeUpdateDialog.bind(this);
    this.confirmUpdating = this.confirmUpdating.bind(this);
    this.updatedDescription = React.createRef();
    this.state = {
      updateDialogOpened: false
    }
  }
  openUpdateDialog(){
    this.setState({ updateDialogOpened: true });
  }
  closeUpdateDialog(){
    this.setState({ updateDialogOpened: false });
  }
  confirmUpdating(){
    if(this.updatedDescription.current && this.updatedDescription.current.value && this.updatedDescription.current.value.trim()){
      if(this.updatedDescription.current.value.trim() !== this.props.description.trim()){
        this.props.onUpdate(this.props.topic+"s", {id:this.props.id, description: this.updatedDescription.current.value.trim()});
      }
      this.closeUpdateDialog();
    }
  }

  render(){
    return(
      <div className="inline-block">

        {this.props.mode==='icon' && (
          <div className="inline-block minimum-space-after">
            <Button variant="outlined" className="icon-only-button no-radius" onClick={this.openUpdateDialog}><FaRegEdit/> </Button>
          </div>
        )}

        {this.props.mode==='default' && (
          <div className="inline-block small-margin-top">
            <Button variant="outlined" className="no-radius color-gray" onClick={this.openUpdateDialog}><FaRegEdit/> &nbsp; Update</Button>
          </div>
        )}

        <Dialog open={this.state.updateDialogOpened} onClose={this.closeUpdateDialog} fullWidth maxWidth="lg">
          <DialogTitle id="form-dialog-title">UPDATE {this.props.topic.toUpperCase()}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are about to change {this.props.topic} description with the new one.
            </DialogContentText>
            <div className="bottom-space"> </div>
            <TextField autoFocus autoComplete="off" multiline rows={5} id="name" label="Description" type="text" defaultValue={this.props.description} fullWidth inputRef={this.updatedDescription}/>
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
