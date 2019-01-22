import React from "react";
import {Component} from "react";
import {ColorBox} from "../components/ColorBox";
import {GoSearch, GoTextSize} from "react-icons/go";
import Divider from "@material-ui/core/es/Divider/Divider";
import {TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import Button from "@material-ui/core/es/Button/Button";
import {SourceListItem} from "../components/SourceListItem";
import {SourceInfo} from "./SourceInfo";

export default class Sources extends Component{


  constructor(props) {
    super(props);
    this.state = {
      sourceInfoDialogOpened: false,
      sourceDialogScroll:'paper',
      snackbarOpened: false,
      verticalSnackBar:'top',
      horizontalSnackbar:'center',
      snackbarMessage:'',
      originalSources: [
        {id:1, theme:"reflex-silver", title:"Maximillian Swartzmuller", count:"41", pinned:false,
          items: [
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"This is some dumb description"},
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Bottom Navigation"},
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Colors"},
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"ES-Lint"},
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Range"}
          ]},
        {id:2, theme:"ocean-blue", title:"Angular Deploy", count:"12", pinned: false,
          items: [
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"This is some dumb description"},
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Bottom Navigation"},
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Colors"},
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"ES-Lint"},
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Range"}
          ]}
      ],
      sources: [
        {id:1, theme:"reflex-silver", title:"Maximillian Swartzmuller", count:"41", pinned:false,
          items: [
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"This is some dumb description"},
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Bottom Navigation"},
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Colors"},
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"ES-Lint"},
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Range"}
          ]},
        {id:2, theme:"ocean-blue", title:"Angular Deploy", count:"12", pinned: false,
          items: [
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"This is some dumb description"},
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Bottom Navigation"},
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Colors"},
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"ES-Lint"},
            {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Range"}
          ]}
      ],
    };
    this.handleThemeChange = this.handleThemeChange.bind(this);
    this.handleSourceNameChange = this.handleSourceNameChange.bind(this);
    this.handleSourceRemoval = this.handleSourceRemoval.bind(this);
    this.handleSourcePin = this.handleSourcePin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlSnackbarOpening = this.handlSnackbarOpening.bind(this);
    this.handleSnackbarClosing = this.handleSnackbarClosing.bind(this);
    this.filterSources = this.filterSources.bind(this);
    this.closeSourceInfoDialog = this.closeSourceInfoDialog.bind(this);
    this.openSourceInfoDialog = this.openSourceInfoDialog.bind(this);
    this.sourceName = React.createRef();
  }
  openSourceInfoDialog(source){
    this.setState({ ...this.state, sourceInfoDialogOpened: true, selectedSource:source });
  }
  closeSourceInfoDialog(){
    this.setState({ ...this.state, sourceInfoDialogOpened: false });
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

  filterSources(event){
    event.preventDefault();
    let filterValue = event.target.value;
    if(filterValue && filterValue.trim()){
      this.setState({
        ...this.state,
        sources: this.state.sources.filter(source => source.title.trim().toLowerCase().indexOf(filterValue.trim().toLowerCase())>=0)
      });
    } else {
      this.setState({
        ...this.state,
          sources: this.state.originalSources
      })
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

        <div className="bottom-space">
          <p className="color-gray medium-line-spacing medium-text">Sources</p>
        </div>

        <form onSubmit={this.filterSources}>
          <div className="margin-top color-gray small-line-spacing bottom-space">
            <TextField type="text" autoComplete="off" id="searchSource" label="Search source"
                       fullWidth
                       onKeyUp={this.filterSources}
                       InputProps={{
                         startAdornment: (
                           <InputAdornment position="start">
                             <GoSearch />
                           </InputAdornment>
                         ),
                       }}
            />
          </div>
        </form>

        {this.state.sources.map((source,i)=><ColorBox onSourceInfoView={()=>this.openSourceInfoDialog(source)} key={i} onSourcePin={this.handleSourcePin} onSourceRemoval={this.handleSourceRemoval} onSourceNameChange={this.handleSourceNameChange} onThemeChange = {this.handleThemeChange} id={source.id} pinned={source.pinned} theme={source.theme} count={source.count} title={source.title}/>)}
        {!Boolean(this.state.sources.length) && (
          <div className="bottom-space">
            <p className="color-gray medium-line-spacing">No sources found.</p>
          </div>
        )}

        <SourceInfo onSourceInfoDialogClose={this.closeSourceInfoDialog} sourceInfoDialogOpened={this.state.sourceInfoDialogOpened} source={this.state.selectedSource}/>
      </div>
    )
  }
}

