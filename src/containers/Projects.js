import React from "react";
import {Component} from "react";
import {Project} from "./Project";
import {GoSearch, GoTextSize} from "react-icons/go";
import Divider from "@material-ui/core/es/Divider/Divider";
import {TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";

export default class Projects extends Component{


  constructor(props) {
    super(props);
    this.state = {
      snackbarOpened: false,
      verticalSnackBar:'top',
      horizontalSnackbar:'center',
      snackbarMessage:'',
      originalProjects: [
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlSnackbarOpening = this.handlSnackbarOpening.bind(this);
    this.handleSnackbarClosing = this.handleSnackbarClosing.bind(this);
    this.filterProjects = this.filterProjects.bind(this);
    this.projectName = React.createRef();
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

  handleSubmit(event){
    event.preventDefault();
    if(this.projectName.current.value && this.projectName.current.value.trim()){
      let projectExists = this.state.projects.filter(project => project.title.trim().toLowerCase() === this.projectName.current.value.trim().toLowerCase());
      if(!projectExists.length){
        let newProject =  {id:Math.floor(Math.random()*10000), theme:"reflex-silver", title:this.projectName.current.value.trim(), count:"0", pinned: false};
        this.setState({
          projects:[
            ...this.state.projects,
            newProject
          ]
        });
        this.projectName.current.value = '';
      } else {
        this.handlSnackbarOpening('top', 'center', 'ProjectInfo with such name already exists.')
      }
    } else {
      this.handlSnackbarOpening('top', 'center', 'Please provide a valid name.')
    }
  }

  filterProjects(event){
    event.preventDefault();
    let filterValue = event.target.value;
    if(filterValue && filterValue.trim()){
      this.setState({
        ...this.state,
        projects: this.state.projects.filter(project => project.title.trim().toLowerCase().indexOf(filterValue.trim().toLowerCase())>=0)
      });
    } else {
      this.setState({
        ...this.state,
          projects: this.state.originalProjects
      })
    }
  }
  render(){
    const pinned = this.state.projects.filter((project,i)=> project.pinned);
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

        <form onSubmit={this.handleSubmit} className="col-xs-12 col-sm-12 col-md-6 col-lg-6 no-padding">
          <div className="margin-top color-gray small-line-spacing bottom-space">
            <TextField type="text" autoComplete="off" id="projectName" label="Enter the new project name" inputRef={this.projectName}
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


        <form onSubmit={this.filterProjects}  className="col-xs-12 col-sm-12 col-md-6 col-lg-6 no-padding">
          <div className="margin-top color-gray small-line-spacing bottom-space">
            <TextField type="text" autoComplete="off" id="searchProject" label="Search project"
                       fullWidth
                       onKeyUp={this.filterProjects}
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



        {this.state.projects.map((project,i)=><Project onProjectInfoView={()=>this.openProjectInfoDialog(project)} key={i} onProjectPin={this.handleProjectPin} onProjectRemoval={this.handleProjectRemoval} onProjectNameChange={this.handleProjectNameChange} onThemeChange = {this.handleThemeChange} id={project.id} pinned={project.pinned} theme={project.theme} count={project.count} title={project.title}/>)}
        {!Boolean(this.state.projects.length) && (
          <div className="bottom-space">
            <p className="color-gray medium-line-spacing">No projects found.</p>
          </div>
        )}

      </div>
    )
  }
}

