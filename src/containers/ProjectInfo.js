import React from "react";
import {Component} from "react";
import {ProjectListItem} from "../components/ProjectListItem";
export default class ProjectInfo extends Component{

  project = {
    project: "Maximillian Swartzmuller",
    items: [
      {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"This is some dumb description"},
      {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Bottom Navigation"},
      {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Colors"},
      {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"ES-Lint"},
      {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Range"}
    ]
  }

  render(){
    return(
      <div className="overflow-auto">
        <p className="big-line-spacing big-text color-gray">
         Project: <strong>{this.project.project} ({this.project.items.length})</strong>
        </p>
        <ul className="project-items-list">
          {this.project.items.map((project, i) => <ProjectListItem key={i} description={project.description} link={project.link } /> )}
        </ul>
      </div>
    )
  }
}

