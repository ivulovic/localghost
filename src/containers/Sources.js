import React from "react";
import {Component} from "react";
import {ColorBox} from "../components/ColorBox";
import {GoTextSize} from "react-icons/go";
import Divider from "@material-ui/core/es/Divider/Divider";
import {TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";

export default class Sources extends Component{


  constructor(props) {
    super(props);
    this.state = {
      snackbarOpened: false,
      verticalSnackBar:'top',
      horizontalSnackbar:'center',
      snackbarMessage:'',
      sources: [
        {id:1, theme:"reflex-silver", title:"Maximillian Swartzmuller", count:"41", pinned:false},
        {id:2, theme:"ocean-blue", title:"Angular Deploy", count:"12", pinned: true}
      ]
    };
    this.handleThemeChange = this.handleThemeChange.bind(this);
    this.handleSourceNameChange = this.handleSourceNameChange.bind(this);
    this.handleSourceRemoval = this.handleSourceRemoval.bind(this);
    this.handleSourcePin = this.handleSourcePin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlSnackbarOpening = this.handlSnackbarOpening.bind(this);
    this.handleSnackbarClosing = this.handleSnackbarClosing.bind(this);
    this.sourceName = React.createRef();
  }

  handlSnackbarOpening (vertical, horizontal, message) {
    this.setState({
      ...this.state,
        snackbarOpened: true,
        verticalSnackBar:vertical,
        horizontalSnackbar:horizontal,
        snackbarMessage:message
       });
    setTimeout(()=>{
      this.setState({
        ...this.state,
        snackbarOpened:false
      })
    }, 2000)
  };

  handleSnackbarClosing(){
    this.setState({ snackbarOpened: false });
  };

  handleThemeChange(sourceId, theme){
    this.setState({
      sources:  this.state.sources.map(source=> source.id === sourceId ? {...source, theme} : source)
    })
  }

  handleSourceNameChange(sourceId, sourceName){
    this.setState({
      sources: this.state.sources.map(source=> source.id === sourceId ? {...source, title:sourceName} : source)
    })
  }

  handleSourceRemoval(sourceId){
    this.setState({
      sources: this.state.sources.filter(source=> source.id !== sourceId)
    })
  }
  handleSourcePin(sourceId){
    this.setState({
      sources: this.state.sources.map(source=> source.id === sourceId ? {...source, pinned:!source.pinned} : source)
    })
  }

  handleSubmit(event){
    event.preventDefault();
    if(this.sourceName.current.value && this.sourceName.current.value.trim()){
      let sourceExists = this.state.sources.filter(source => source.title.trim().toLowerCase() === this.sourceName.current.value.trim().toLowerCase());
      if(!sourceExists.length){
        let newSource =  {id:Math.floor(Math.random()*10000), theme:"reflex-silver", title:this.sourceName.current.value.trim(), count:"0", pinned: false};
        this.setState({
          sources:[
            ...this.state.sources,
            newSource
          ]
        });
        this.sourceName.current.value = '';
      } else {
        this.handlSnackbarOpening('top', 'center', 'Source with such name already exists.')
      }
    } else {
      this.handlSnackbarOpening('top', 'center', 'Please provide a valid name.')
    }
  }
  render(){
    const pinned = this.state.sources.filter((source,i)=> source.pinned);
    return(
      <div className="overflow-auto sources">

        <Snackbar
          anchorOrigin={{ vertical: this.state.verticalSnackBar, horizontal:this.state.horizontalSnackbar }}
          open={this.state.snackbarOpened}
          onClose={this.handleSnackbarClosing}
          ContentProps={{
            'aria-describedby': 'message-id',
            'className':'snackbar-message',
          }}
          message={<strong id="message-id">{this.state.snackbarMessage}</strong>}
        />

        <p className="color-gray medium-line-spacing medium-text">Create New Source</p>

        <form onSubmit={this.handleSubmit}>
          <div className="margin-top color-gray small-line-spacing bottom-space">
            <TextField type="text" autoComplete="off" id="sourceName" label="Enter the new source name" inputRef={this.sourceName}
                       fullWidth
                       InputProps={{
                         startAdornment: (
                           <InputAdornment position="start">
                             <GoTextSize />
                           </InputAdornment>
                         ),
                       }}
            />
          </div>
        </form>

        {Boolean(pinned.length) && (
          <div className="bottom-space">
            <p className="color-gray medium-line-spacing medium-text">Pinned Sources</p>
          </div>
        )}

        {pinned.map((source,i) => <ColorBox key={i} onSourcePin={this.handleSourcePin} onSourceRemoval={this.handleSourceRemoval} onSourceNameChange={this.handleSourceNameChange} onThemeChange = {this.handleThemeChange} id={source.id} pinned={source.pinned} theme={source.theme} count={source.count} title={source.title}/>)}

        {Boolean(pinned.length) && (
          <div className="bottom-space">
            <div className="bottom-space"></div>
            <Divider/>
          </div>
        )}

        {Boolean(this.state.sources.length) && (
          <div className="bottom-space">
            <p className="color-gray medium-line-spacing medium-text">Sources</p>
          </div>
        )}

        {this.state.sources.map((source,i)=><ColorBox key={i} onSourcePin={this.handleSourcePin} onSourceRemoval={this.handleSourceRemoval} onSourceNameChange={this.handleSourceNameChange} onThemeChange = {this.handleThemeChange} id={source.id} pinned={source.pinned} theme={source.theme} count={source.count} title={source.title}/>)}

      </div>
    )
  }
}

