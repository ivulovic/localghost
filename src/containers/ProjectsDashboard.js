import React from "react";
import {Component} from "react";
import {ProjectThumbnail} from "./ProjectThumbnail";
import {GoSearch} from "react-icons/go";
import {TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import Menu from "@material-ui/core/es/Menu/Menu";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import themes from "../utils/themes";
import ProjectService from "../services/project.service";
import {Spinner} from "../components/Spinner";
import {FaPlus} from "react-icons/fa";

export default class ProjectsDashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      snackbarOpened: false,
      createProjectOpened: false,
      verticalSnackBar:'top',
      horizontalSnackbar:'center',
      snackbarMessage:'',
      themePickerAnchor:null,
      selectedTheme:"reflex-silver",
      loading: true,
      projects: []
    };
    this.projectName = React.createRef();
    this.filterValue = React.createRef();
  }

  componentDidMount() {
    ProjectService.getProjects()
      .then((projects) => this.setState({loading: false, projects}))
      .catch((error) => this.setState({loading: false}))
  }

  handlSnackbarOpening = (vertical, horizontal, message) => {
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

  handleSnackbarClosing = () => {
    this.setState({ snackbarOpened: false });
  };

  update = (obj) => {
    this.setState({
      projects:  this.state.projects.map(project=> project.id === obj.id ? {...project, ...obj} : project)
    })
  };

  handleProjectRemoval = (projectId)=>{
    this.setState({
      projects: this.state.projects.filter(project=> project.id !== projectId)
    })
  };

  preventDefaultBehaviour = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  filterProjects = (event)=>{
    event.preventDefault();
    let filterValue = event.target.value;
    if(filterValue && filterValue.trim()){
      this.setState({
        ...this.state,
        filterValue:filterValue.trim().toLowerCase()
      })
    } else {
      this.setState({
        ...this.state,
        filterValue:''
      })
    }
  };

  openCreateProjectDialog = () => {
     this.setState({ createProjectOpened: true });
  };

  closeCreateProjectDialog = () => {
     this.setState({ createProjectOpened: false, selectedTheme:'reflex-silver' });
  };

  confirmProjectCreation = (event) => {
    event.preventDefault();
    if(this.projectName.current.value && this.projectName.current.value.trim()){
      let projectExists = this.state.projects.filter(project => project.name.trim().toLowerCase() === this.projectName.current.value.trim().toLowerCase());
      if(!projectExists.length){
        let newProject =  {id:Math.floor(Math.random()*10000), theme:this.state.selectedTheme, name:this.projectName.current.value.trim(), count:"0", pinned: false};
        this.setState({
          projects:[
            ...this.state.projects,
            newProject
          ]
        });
        this.projectName.current.value = '';
        this.closeCreateProjectDialog();
      } else {
        this.handlSnackbarOpening('top', 'center', 'ProjectThumbnail with such name already exists.')
      }
    } else {
      this.handlSnackbarOpening('top', 'center', 'Please provide a valid name.')
    }
  };

  openThemePicker = (event) => {
     this.setState({ themePickerAnchor: event.currentTarget });
  };

  closeThemePicker = (event) => {
     this.setState({ themePickerAnchor: null });
  };

  selectTheme = (event, selectedTheme) => {
    this.setState({
      selectedTheme,
      themePickerAnchor:null
    })
  };

  render(){
    const pinned = this.state.projects.filter((project,i) => project.pinned);
    const projects = (this.state.projects && this.state.projects.length) ? this.state.projects.filter(project => project.name.trim().toLowerCase().indexOf(this.state.filterValue)>=0) : [];
    return(
      <div className="overflow-auto projects margin-top">
        <Snackbar anchorOrigin={{ vertical: this.state.verticalSnackBar, horizontal:this.state.horizontalSnackbar }} open={this.state.snackbarOpened} onClose={this.handleSnackbarClosing} message={<strong id="message-id">{this.state.snackbarMessage}</strong>} ContentProps={{'aria-describedby': 'message-id', 'className':'snackbar-message',}}/>

        <Button className="flat-button" onClick={this.openCreateProjectDialog}><FaPlus size={22} color="01B3E3"/> &nbsp;&nbsp; <span className="color-gray">New Project</span></Button>
        <form onSubmit={this.preventDefaultBehaviour} className="search-project-form pull-right">
            <TextField type="text" placeholder="Enter the project name..." autoComplete="off" id="searchProject" label="" fullWidth onKeyUp={this.filterProjects} inputRef={this.filterValue} InputProps={{startAdornment: (<InputAdornment position="start"><GoSearch /></InputAdornment>)}}/>
        </form>

        <div className="clear"/>

        <Dialog maxWidth='md' fullWidth open={this.state.createProjectOpened} onClose={this.closeCreateProjectDialog}>
          <DialogTitle id="form-dialog-title">Create Project</DialogTitle>
          <DialogContent>
            <form onSubmit={this.preventDefaultBehaviour}>
              <TextField autoFocus autoComplete="off" id="projectName" label="Project name" type="text" defaultValue={this.props.title} fullWidth inputRef={this.projectName}/>
              <div className="bottom-space"/>
              <TextField autoComplete="off" id="details" label="Details" type="text" defaultValue={this.props.title} fullWidth inputRef={this.details} multiline rows="4"/>
              <div className="bottom-space"/>
              <p className="label">Theme</p>
              <div className={"theme-preview-big pointer "+this.state.selectedTheme} onClick={this.openThemePicker}> </div>
              <Menu anchorEl={this.state.themePickerAnchor} open={Boolean(this.state.themePickerAnchor)} onClose={this.closeThemePicker} PaperProps={{style: {maxHeight: 48 * 4.5, width: 200}}}>
                {themes.map((option, j) => (
                  <MenuItem key={j} selected={option.id === this.props.theme} className="color-gray" onClick={(event)=>this.selectTheme(event, option.id)}>
                    <span className={'theme-preview '+option.id}> </span> {option.name}
                  </MenuItem>
                ))}
              </Menu>
           </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeCreateProjectDialog} color="primary"> Cancel </Button>
            <Button onClick={this.confirmProjectCreation} color="primary"> Save </Button>
          </DialogActions>
        </Dialog>


        <div className="bottom-space"><p className="color-gray medium-line-spacing medium-text main-padding">Projects</p></div>
        <div className="clear"/>
        {Boolean(pinned.length) && (<div className="bottom-space"><p className="color-gray small-line-spacing main-padding">Pinned Projects</p></div>)}
        {pinned.map((project,i) => <ProjectThumbnail key={i} onUpdate={this.update} onRemove={this.handleProjectRemoval} id={project.id} pinned={project.pinned} theme={project.theme} count={project.numberOfTasks} title={project.name}/>)}
        <div className="clear"/>
        {Boolean(this.state.projects.length) && (<div className="bottom-space margin-top"><p className="color-gray small-line-spacing main-padding">All Projects</p></div>)}
        {projects.map((project,i) => <ProjectThumbnail key={i} onUpdate={this.update} onRemove={this.handleProjectRemoval} id={project.id} pinned={project.pinned} theme={project.theme} count={project.numberOfTasks} title={project.name}/> )}
        {(!Boolean(projects.length) && !this.state.loading) && (<div className="bottom-space"><p className="no-results-paragraph">We couldn't find any project.</p></div>)}
        <div className="text-center"><Spinner spin={this.state.loading}/></div>

      </div>
    )
  }
}

