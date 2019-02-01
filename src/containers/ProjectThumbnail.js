import React from "react";
import {NavLink} from "react-router-dom";
import {MdDelete, MdEdit, MdPalette} from "react-icons/md";
import Button from "@material-ui/core/es/Button/Button";
import Menu from "@material-ui/core/es/Menu/Menu";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import {FaPaintRoller} from "react-icons/fa";
import {GoFlame} from "react-icons/go";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import {TiPin, TiPinOutline} from "react-icons/ti";
import themes from "../utils/themes";

export class ProjectThumbnail extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      anchorEl: null,
      editDialogOpened:false,
      removeDialogOpened:false,
      pinDialogOpened:false
    };
    this.openThemePicker = this.openThemePicker.bind(this);
    this.closeThemePicker = this.closeThemePicker.bind(this);
    this.openEditDialog = this.openEditDialog.bind(this);
    this.closeEditDialog = this.closeEditDialog.bind(this);
    this.confirmEditingProject = this.confirmEditingProject.bind(this);
    this.preventClose = this.preventClose.bind(this);
    this.openRemoveDialog = this.openRemoveDialog.bind(this);
    this.closeRemoveDialog = this.closeRemoveDialog.bind(this);
    this.confirmProjectRemoval = this.confirmProjectRemoval.bind(this);
    this.openPinDialog = this.openPinDialog.bind(this);
    this.closePinDialog = this.closePinDialog.bind(this);
    this.confirmProjectPin = this.confirmProjectPin.bind(this);
    this.editedProjectName = React.createRef();
   }
  preventClose(event){
    event.stopPropagation();
    event.preventDefault();
  }
  openThemePicker(event){
    this.preventClose(event);
    this.setState({ themePickerAnchor: event.currentTarget });
  };
  closeThemePicker(event){
    this.preventClose(event);
    this.setState({ themePickerAnchor: null });
  }
  handleThemeChange(event, theme, id){
    this.preventClose(event);
    this.setState({ themePickerAnchor: null });
    this.props.onThemeChange(id, theme);
  };

  openEditDialog (event) {
    this.preventClose(event);
    this.setState({ editDialogOpened: true });
  };
  closeEditDialog (event) {
    this.preventClose(event);
    this.setState({ editDialogOpened: false });
  };
  confirmEditingProject(event){
    let newProjectName = this.editedProjectName.current.value;
    if(newProjectName && newProjectName.trim()){
      if(newProjectName.trim() !== this.props.title){
        this.props.onProjectNameChange(this.props.id, newProjectName.trim());
      }
    }
    this.closeEditDialog(event);
  }

  openRemoveDialog (event) {
    this.preventClose(event);
    this.setState({ removeDialogOpened: true });
  };
  closeRemoveDialog (event) {
    this.preventClose(event);
    this.setState({ removeDialogOpened: false });
  };
  confirmProjectRemoval(event){
    this.props.onProjectRemoval(this.props.id);
    this.closeRemoveDialog(event);
  }

  openPinDialog (event) {
    this.preventClose(event);
    this.setState({ pinDialogOpened: true });
  };
  closePinDialog (event) {
    this.preventClose(event);
    this.setState({ pinDialogOpened: false });
  };
  confirmProjectPin(event){
    this.props.onProjectPin(this.props.id);
    this.closePinDialog(event);
  }

  render(){
    const options = themes;
    const ITEM_HEIGHT = 48;
    return (
      <div className="project-thumbnail col-xs-11 col-sm-11 col-md-3 col-lg-3 bottom-space">
        <NavLink to={"/projects/"+this.props.id}>
          <div className={"project-thumbnail-theme "+this.props.theme}/>
          <p className="col-xs-12 col-sm-12 col-md-11 col-lg-11 project-thumbnail-project-name project-thumbnail-paragraph">{this.props.title}</p>
          <p className="col-xs-12 col-sm-12 col-md-11 col-lg-11 text-muted project-thumbnail-paragraph small-bottom-space">{this.props.count} Tasks</p>

          <Button className="col-xs-3 col-sm-3 col-md-3 col-lg-3 no-side-padding" onClick={this.openPinDialog}>
            <span className="project-thumbnail-settings-icon">  {this.props.pinned ? <TiPin size={28} /> : <TiPinOutline size={28} />} </span>
          </Button>
          <Button className="col-xs-3 col-sm-3 col-md-3 col-lg-3 no-side-padding" onClick={this.openThemePicker} >
            <span className="project-thumbnail-settings-icon"> <MdPalette size={28}/> </span>
          </Button>
          <Button className="col-xs-3 col-sm-3 col-md-3 col-lg-3 no-side-padding"  onClick={this.openEditDialog}>
            <span className="project-thumbnail-settings-icon"> <MdEdit size={28}/> </span>
          </Button>
          <Button className="col-xs-3 col-sm-3 col-md-3 col-lg-3 no-side-padding" onClick={this.openRemoveDialog}>
            <span className="project-thumbnail-settings-icon"> <MdDelete size={28} /> </span>
          </Button>

          <div className="clear"/>
          <div className={"project-thumbnail-bottom-line "+this.props.theme}/>
        </NavLink>
        <Dialog open={this.state.pinDialogOpened} onClose={this.closePinDialog} onClick={this.preventClose}>
          <DialogTitle id="alert-dialog-title">{this.props.pinned ? 'Unpin ':'Pin '} Project</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This means that your project <strong className="color-gray">{this.props.title}</strong> {this.props.pinned ? 'will not be shown anymore' : 'will appear above all other projects'} in pinned section.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closePinDialog} color="primary" autoFocus> Cancel </Button>
            <Button onClick={this.confirmProjectPin} color="primary"> Confirm </Button>
          </DialogActions>
        </Dialog>

        <Menu anchorEl={this.state.themePickerAnchor} open={Boolean(this.state.themePickerAnchor)} onClose={this.closeThemePicker} PaperProps={{style: {maxHeight: ITEM_HEIGHT * 4.5, width: 200}}}>
          {options.map((option, j) => (
            <MenuItem key={j} selected={option.id === this.props.theme} className="color-gray" onClick={(event)=>this.handleThemeChange(event, option.id, this.props.id)}>
              <span className={'theme-preview '+option.id}> </span> {option.name}
            </MenuItem>
          ))}
        </Menu>

        <Dialog open={this.state.editDialogOpened} onClose={this.closeEditDialog} onClick={this.preventClose}>
          <DialogTitle id="form-dialog-title">Update Project Name</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are about to change project name of <strong className="color-gray"> {this.props.title} </strong> with the new one:
            </DialogContentText>
            <TextField autoFocus autoComplete="off" id="name" label="Project name" type="text" defaultValue={this.props.title} fullWidth inputRef={this.editedProjectName}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeEditDialog} color="primary"> Cancel </Button>
            <Button onClick={this.confirmEditingProject} color="primary"> Save </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.removeDialogOpened} onClose={this.closeRemoveDialog} onClick={this.preventClose}>
          <DialogTitle id="alert-dialog-title">Confirm Project Removal</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This means that your project <strong className="color-gray">{this.props.title}</strong> and its items will be removed forever.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeRemoveDialog} color="primary"> Cancel </Button>
            <Button onClick={this.confirmProjectRemoval} color="primary" autoFocus> Confirm </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
