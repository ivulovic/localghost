import React from "react";
import {Component} from "react";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import ListItemAvatar from "@material-ui/core/es/ListItemAvatar/ListItemAvatar";
import {Project} from "./Project";
import {Route, Link} from "react-router-dom";

export default class Projects extends Component{

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
            <List className="side-menu-list">
              {['Projects 1', 'Influencer LTD', 'Some test shit'].map((project) => (
                  <ListItem key={project} className="no-padding-left pointer" onClick={()=>{}}>
                    <Link to={`/projects/${Math.floor(Math.random()*1000)}`}>
                      <ListItemText className="color-gray" primary={project}/>
                    </Link>
                  </ListItem>
              ))}
            </List>
          </div>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 no-padding">
          <div className="project-body-right">
            <Route path={`/projects/:id`} component={Project}/>
            <Route exact path={"/projects"} render={() =>  <p className="text-muted">Please select a project.</p>}/>
            <Route exact path={"/"} render={() => <p className="text-muted">Please select a project.</p>}/>
          </div>
        </div>

      </div>
    )
  }
}


