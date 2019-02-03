import React from "react";
import {Component} from "react";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import ListItemAvatar from "@material-ui/core/es/ListItemAvatar/ListItemAvatar";
import {Project} from "./Project";
import {Route, Link} from "react-router-dom";
import ProjectsDashboard from "./ProjectsDashboard";
import ProjectService from "../services/project.service";
import {Spinner} from "../components/Spinner";

export default class Projects extends Component{

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      projects:[]
    }
  }

  componentDidMount() {
    ProjectService.getProjects()
      .then(projects=>this.setState({projects, loading: false}))
      .catch(error=>this.setState({loading: false}))
  }

  render(){
    return(
        <div className="overflow-auto">
        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 no-padding overflow-auto">
          <div className="avatar-header">
            <ListItem alignItems="flex-start">
              <ListItemAvatar><Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" className="big-avatar"/></ListItemAvatar>
              <ListItemText primary="Ivan Vulovic" className="small-margin-top" secondary={<React.Fragment><span className="inline-block small-margin-top">256 Projects</span></React.Fragment>}/>
            </ListItem>
          </div>

          <div>
            <strong className="list-title">Projects</strong>
              <Spinner spin={this.state.loading}/>
            {(!Boolean(this.state.projects.length) && !this.state.loading) && (<p className="no-results-paragraph">
                We couldn't find any project.
              </p>
            )}
            <List className="side-menu-list">
              {this.state.projects.map((project) => (
                  <ListItem key={project.id} className="no-padding-left pointer">
                    <Link to={`/projects/${project.id}`}>
                      <ListItemText className="color-gray" primary={project.name}/>
                    </Link>
                  </ListItem>
              ))}
            </List>
          </div>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 no-padding">
          <div className="project-body-right">
            <Route path={`/projects/:id`} component={Project}/>
            <Route exact path={"/projects"} component={ProjectsDashboard}/>
            <Route exact path={"/"} component={ProjectsDashboard}/>
          </div>
        </div>

      </div>
    )
  }
}


