import React from "react";
import {Component} from "react";
import {ProjectListItem} from "../components/ProjectListItem";
import Button from "@material-ui/core/es/Button/Button";
import {FaChevronCircleDown, FaChevronDown, FaUserPlus, FaUsers} from "react-icons/fa";
import ExpansionPanel from "@material-ui/core/es/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/es/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/es/ExpansionPanelDetails/ExpansionPanelDetails";
import Typography from "@material-ui/core/es/Typography/Typography";
import {MdExpandMore} from "react-icons/md";
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
        <div className="margin-top bottom-space overflow-auto">
          <div className="col-xs-12 col-ms-12 col-md-6 col-lg-6 no-padding">
            <p className="project-title color-gray"> {this.project.project} </p>
          </div>
          <div className="col-xs-12 col-ms-12 col-md-6 col-lg-6 no-padding project-controls">
            <Button variant="outlined" size="large" className="large-button space-after">
              <FaUsers size={24} className="color-gray"/> &nbsp; Manage team
            </Button>
            <Button variant="outlined" size="large" className="large-button">
              <FaUserPlus size={24} className="color-gray"/> &nbsp; Add Member
            </Button>
           </div>
        </div>

        <div className="bottom-space small-line-spacing">
          <strong className="color-gray">Leader: </strong>
          <p className="color-gray  inline-block">
            Ivan Vulovic
          </p>
        </div>

        <div className="bottom-space small-line-spacing">
          <strong className="color-gray">Date Created: </strong>
          <p className="color-gray  inline-block">
            January 25, 2019
          </p>
        </div>

        <div className="bottom-space small-line-spacing">
          <strong className="color-gray">Project Details: </strong>
          <p className="color-gray  inline-block">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis culpa dolorem ea eveniet expedita fugiat impedit iure, neque quam quis.
          </p>
        </div>



        <ExpansionPanel className="expansion-panel">
          <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
            <strong className="color-gray small-line-spacing">Links</strong>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ul className="project-items-list">
              {this.project.items.map((project, i) => <ProjectListItem key={i} description={project.description} link={project.link } /> )}
            </ul>
          </ExpansionPanelDetails>
        </ExpansionPanel>



      </div>
    )
  }
}

