import React from "react";
import {NavLink} from "react-router-dom";
import {MdPalette} from "react-icons/md";
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

export class ColorBox extends React.Component{

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
    this.confirmEditingSource = this.confirmEditingSource.bind(this);
    this.preventClose = this.preventClose.bind(this);
    this.openRemoveDialog = this.openRemoveDialog.bind(this);
    this.closeRemoveDialog = this.closeRemoveDialog.bind(this);
    this.confirmSourceRemoval = this.confirmSourceRemoval.bind(this);
    this.openPinDialog = this.openPinDialog.bind(this);
    this.closePinDialog = this.closePinDialog.bind(this);
    this.confirmSourcePin = this.confirmSourcePin.bind(this);
    this.editedSourceName = React.createRef();
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
  confirmEditingSource(event){
    let newSourceName = this.editedSourceName.current.value;
    if(newSourceName && newSourceName.trim()){
      if(newSourceName.trim() !== this.props.title){
        this.props.onSourceNameChange(this.props.id, newSourceName.trim());
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
  confirmSourceRemoval(event){
    this.props.onSourceRemoval(this.props.id);
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
  confirmSourcePin(event){
    this.props.onSourcePin(this.props.id);
    this.closePinDialog(event);
  }

  render(){
    const { themePickerAnchor } = this.state;
    const options = [
      {id:'reflex-silver', name: 'Reflex Silver'},
      {id:'ocean-blue', name: 'Ocean Blue'},
      {id:'new-leaf', name: 'New Leaf'},
      {id:'leaf', name: 'Leaf'},
      {id:'ultramarine', name: 'Ultramarine'},
      {id:'pixle-dust', name: 'Pixle Dust'},
      {id:'neon-glow', name: 'Neon Glow'},
      {id:'spring-greens', name: 'Spring Greens'},
      {id:'luscious-lime', name: 'Luscious Lime'},
      {id:'firebrick', name: 'Firebrick'},
      {id:'mars', name: 'Mars'},
      {id:'sanguine', name: 'Sanguine'},
      {id:'fizzy-peach', name: 'Fizzy Peach'},
      {id:'pink-sugar', name: 'Pink Sugar'},
      {id:'fresh-papaya', name: 'Fresh Papaya'},
      {id:'lemon-drizzle', name: 'Lemon Drizzle'},
      {id:'victoria-purple', name: 'Victoria Purple'},
      {id:'purple-lake', name: 'Purple Lake'},
      {id:'evening-light', name: 'Evening Light'},
      {id:'sweet-dream', name: 'Sweet Dream'},
      {id:'pink', name: 'Pink'},
      {id:'berry-smoothie', name: 'Berry Smoothie'},
      {id:'mystic-muave', name: 'Mystic Muave'}
    ];
    const ITEM_HEIGHT = 48;

    return (
      <NavLink to={"/sources/"+this.props.id}>
        <div className={"color-box relative "+this.props.theme}>
          <p className="color-box-counter">{this.props.count}</p>
          <p className="color-box-title">{this.props.title}</p>

          <div className="color-box-settings">
            <div>
              <Button
                aria-haspopup="true"
                onClick={this.openPinDialog}
                className="color-white no-padding">
                <span className="color-box-settings-icon"> {this.props.pinned ? <TiPinOutline size={28} /> : <TiPin size={28} />} </span>
              </Button>

              <Dialog
                open={this.state.pinDialogOpened}
                onClose={this.closePinDialog}
                onClick={this.preventClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{this.props.pinned ? 'Unpin ':'Pin '} Source</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    This means that your source <strong className="color-gray">{this.props.title}</strong> {this.props.pinned ? 'will not be shown anymore' : 'will appear above all other sources'} in pinned section.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.closePinDialog} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.confirmSourcePin} color="primary" autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>

              <Button
                aria-owns={themePickerAnchor ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.openThemePicker}
                className="color-white no-padding"
              >
                <span className="color-box-settings-icon"> <MdPalette/> </span>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={themePickerAnchor}
                open={Boolean(themePickerAnchor)}
                onClose={this.closeThemePicker}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200,
                  },
                }}>
                {options.map((option, j) => (
                  <MenuItem key={j} selected={option.id === this.props.theme} className="color-gray" onClick={(event)=>this.handleThemeChange(event, option.id, this.props.id)}>
                    <span className={'theme-preview '+option.id}> </span> {option.name}
                  </MenuItem>
                ))}
              </Menu>

              <Button
                aria-owns={themePickerAnchor ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.openEditDialog}
                className="color-white no-padding">
                <span className="color-box-settings-icon"> <FaPaintRoller size={26}/> </span>
              </Button>

              <Dialog
                open={this.state.editDialogOpened}
                onClose={this.closeEditDialog}
                aria-labelledby="form-dialog-title"
                onClick={this.preventClose}>
                <DialogTitle id="form-dialog-title">Update Source Name</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    You are about to change source name of <strong className="color-gray"> {this.props.title} </strong> with the new one:
                  </DialogContentText>
                  <TextField
                    autoFocus
                    autoComplete="off"
                    margin="dense"
                    id="name"
                    label="Source name"
                    type="text"
                    defaultValue={this.props.title}
                    fullWidth
                    inputRef={this.editedSourceName}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.closeEditDialog} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.confirmEditingSource} color="primary">
                    Save
                  </Button>
                </DialogActions>
              </Dialog>

              <Button
                aria-haspopup="true"
                onClick={this.openRemoveDialog}
                className="color-white no-padding">
                <span className="color-box-settings-icon"> <GoFlame size={28} /> </span>
              </Button>
              <Dialog
                open={this.state.removeDialogOpened}
                onClose={this.closeRemoveDialog}
                onClick={this.preventClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">Confirm Source Removal</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    This means that your source <strong className="color-gray">{this.props.title}</strong> and its items will be removed forever.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.closeRemoveDialog} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.confirmSourceRemoval} color="primary" autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </NavLink>
    )
  }
}
