import React from "react";
import {Component} from "react";
import {SourceListItem} from "../components/SourceListItem";
export default class Source extends Component{

  source = {
    source: "Maximillian Swartzmuller",
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
         Source: <strong>{this.source.source} ({this.source.items.length})</strong>
        </p>
        <ul className="source-items-list">
          {this.source.items.map((source, i) => <SourceListItem key={i} description={source.description} link={source.link } /> )}
        </ul>
      </div>
    )
  }
}

