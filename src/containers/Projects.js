import React from "react";
import {Component} from "react";
import {Project} from "./Project";
import {GoSearch} from "react-icons/go";
import Divider from "@material-ui/core/es/Divider/Divider";
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

export default class Projects extends Component{
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
      projects: [
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
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
    this.handleProjectRemoval = this.handleProjectRemoval.bind(this);
    this.handleProjectPin = this.handleProjectPin.bind(this);
    this.openCreateProjectDialog = this.openCreateProjectDialog.bind(this);
    this.closeCreateProjectDialog = this.closeCreateProjectDialog.bind(this);
    this.confirmProjectCreation = this.confirmProjectCreation.bind(this);
    this.handlSnackbarOpening = this.handlSnackbarOpening.bind(this);
    this.handleSnackbarClosing = this.handleSnackbarClosing.bind(this);
    this.filterProjects = this.filterProjects.bind(this);

    this.openThemePicker = this.openThemePicker.bind(this);
    this.closeThemePicker = this.closeThemePicker.bind(this);
    this.selectTheme = this.selectTheme.bind(this);
    this.projectName = React.createRef();
    this.filterValue = React.createRef();
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

  handleThemeChange(projectId, theme){
    this.setState({
      projects:  this.state.projects.map(project=> project.id === projectId ? {...project, theme} : project)
    })
  }

  handleProjectNameChange(projectId, projectName){
    this.setState({
      projects: this.state.projects.map(project=> project.id === projectId ? {...project, title:projectName} : project)
    })
  }

  handleProjectRemoval(projectId){
    this.setState({
      projects: this.state.projects.filter(project=> project.id !== projectId)
    })
  }
  handleProjectPin(projectId){
    this.setState({
      projects: this.state.projects.map(project=> project.id === projectId ? {...project, pinned:!project.pinned} : project)
    })
  }


  filterProjects(event){
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
  }

  openCreateProjectDialog () {
     this.setState({ createProjectOpened: true });
  };
  closeCreateProjectDialog () {
     this.setState({ createProjectOpened: false, selectedTheme:'reflex-silver' });
  };
  confirmProjectCreation(event){
    event.preventDefault();
    if(this.projectName.current.value && this.projectName.current.value.trim()){
      let projectExists = this.state.projects.filter(project => project.title.trim().toLowerCase() === this.projectName.current.value.trim().toLowerCase());
      if(!projectExists.length){
        let newProject =  {id:Math.floor(Math.random()*10000), theme:this.state.selectedTheme, title:this.projectName.current.value.trim(), count:"0", pinned: false};
        this.setState({
          projects:[
            ...this.state.projects,
            newProject
          ]
        });
        this.projectName.current.value = '';
        this.closeCreateProjectDialog();
      } else {
        this.handlSnackbarOpening('top', 'center', 'Project with such name already exists.')
      }
    } else {
      this.handlSnackbarOpening('top', 'center', 'Please provide a valid name.')
    }
  }

  openThemePicker(event){
     this.setState({ themePickerAnchor: event.currentTarget });
  };
  closeThemePicker(event){
     this.setState({ themePickerAnchor: null });
  }
  selectTheme(event, selectedTheme){
    this.setState({
      selectedTheme,
      themePickerAnchor:null
    })
  }

  render(){
    const pinned = this.state.projects.filter((project,i) => project.pinned);
    const projects = (this.state.projects && this.state.projects.length) ? this.state.projects.filter(project => project.title.trim().toLowerCase().indexOf(this.state.filterValue)>=0) : [];
    return(
      <div className="overflow-auto projects">

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


        <div className="margin-top color-gray small-line-spacing bottom-space inline-block">

          <Button onClick={this.openCreateProjectDialog} variant="outlined" size="large" className="large-button">
            Create Project
          </Button>

          <form onSubmit={this.filterProjects} className="search-project-form">
              <TextField type="text" autoComplete="off" id="searchProject" label=""
                         fullWidth
                         onKeyUp={this.filterProjects}
                         inputRef={this.filterValue}
                         InputProps={{
                           startAdornment: (
                             <InputAdornment position="start">
                               <GoSearch />
                             </InputAdornment>
                           ),
                         }}
              />
          </form>
        </div>

        <Dialog maxWidth='md' fullWidth open={this.state.createProjectOpened} onClose={this.closeCreateProjectDialog}>
          <DialogTitle id="form-dialog-title">Create Project</DialogTitle>
          <DialogContent>
            <TextField autoFocus autoComplete="off" id="projectName" label="Project name" type="text" defaultValue={this.props.title} fullWidth inputRef={this.projectName}/>
            <div className="bottom-space"></div>
            <TextField autoComplete="off" id="details" label="Details" type="text" defaultValue={this.props.title} fullWidth inputRef={this.details} multiline rows="4"/>
            <div className="bottom-space"></div>
            <p className="label">Theme</p>
            <div className={"theme-preview-big pointer "+this.state.selectedTheme} onClick={this.openThemePicker}> </div>
            <Menu anchorEl={this.state.themePickerAnchor} open={Boolean(this.state.themePickerAnchor)} onClose={this.closeThemePicker} PaperProps={{style: {maxHeight: 48 * 4.5, width: 200}}}>
              {themes.map((option, j) => (
                <MenuItem key={j} selected={option.id === this.props.theme} className="color-gray" onClick={(event)=>this.selectTheme(event, option.id)}>
                  <span className={'theme-preview '+option.id}> </span> {option.name}
                </MenuItem>
              ))}
            </Menu>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeCreateProjectDialog} color="primary"> Cancel </Button>
            <Button onClick={this.confirmProjectCreation} color="primary"> Save </Button>
          </DialogActions>
        </Dialog>

        <div className="clear"></div>

        {Boolean(pinned.length) && (
          <div className="bottom-space">
            <p className="color-gray medium-line-spacing medium-text">Pinned Projects</p>
          </div>
        )}

        {pinned.map((project,i) => <Project key={i} onProjectPin={this.handleProjectPin} onProjectRemoval={this.handleProjectRemoval} onProjectNameChange={this.handleProjectNameChange} onThemeChange = {this.handleThemeChange} id={project.id} pinned={project.pinned} theme={project.theme} count={project.count} title={project.title}/>)}

        {Boolean(pinned.length) && (
          <div className="bottom-space">
            <div className="bottom-space"></div>
            <Divider/>
          </div>
        )}

        <div className="bottom-space">
          <p className="color-gray medium-line-spacing medium-text">Projects</p>
        </div>

        {projects.map((project,i) => <Project onProjectInfoView={()=>this.openProjectInfoDialog(project)} key={i} onProjectPin={this.handleProjectPin} onProjectRemoval={this.handleProjectRemoval} onProjectNameChange={this.handleProjectNameChange} onThemeChange = {this.handleThemeChange} id={project.id} pinned={project.pinned} theme={project.theme} count={project.count} title={project.title}/> )}
        {!Boolean(projects.length) && (
          <div className="bottom-space">
            {/*<p className="color-gray medium-line-spacing">No projects found.</p>*/}
             <div className="text-center">
               <h1 className="color-red big-text">Whoops...</h1>
               <p className="color-gray small-line-spacing">
                 We couldn't find any.
               </p>
             </div>
          </div>
        )}

      </div>
    )
  }
}

