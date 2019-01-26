import React from "react";
import {Component} from "react";
import {withRouter} from "react-router-dom";
import queryString from "query-string";
import {ProjectLinkItem} from "./ProjectLinkItem";

class Search extends Component{

  componentDidMount() {
    let searchString = this.props.history.location.search;
    if(!searchString){
      return this.props.history.push({ pathname: "/"})
    }
    const queryParams = queryString.parse(searchString);
    const searchTerm = queryParams.term;
    if(!searchTerm){
      return this.props.history.push({ pathname: "/"})
    }
  }

  render(){
    const queryParams = queryString.parse(this.props.history.location.search);
    const searchTerm = queryParams.term;
    const searchResults = [
      {
        category:"Vanilla JavaScript",
        topics:[
          {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"This is some dumb description"},
          {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Bottom Navigation"},
          {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Colors"},
          {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"ES-Lint"},
          {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Range"}
        ]
      },
      {
        category:"Javascript and Redux",
        topics:[
          {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"React-Redux Implementation"},
          {path:"#", link:"http://somedubmshit.com/tasks?queryParams=jajaj", description:"Redux in Vanilla JavaScript"},
        ]
      }
      ];
    return (
      <div>
        {!!searchResults.length && <div className="container">
          <p className="big-line-spacing big-text color-gray">
            Search term: <strong>{searchTerm}</strong>
          </p>
          {searchResults.map((item, i) => (
                <div key={i} className="search-results-wrapper">
                  <div className="search-results-section">
                    <p className="medium-line-spacing medium-text color-gray bottom-space">
                      <strong>{item.category}</strong>
                    </p>
                    <ul className="project-items-list">
                      {item.topics.map((project, i) => <ProjectLinkItem key={i} description={project.description} link={project.link } /> )}
                    </ul>
                  </div>
                </div>
          ))}
        </div>}

        {!searchResults.length && (
          <div>
           <div className="relative-container">
             <div className="container">
               <p className="big-line-spacing big-text color-gray">
                 Search term: <strong>{searchTerm}</strong>
               </p>
             </div>
             <div className="centered-content">
               <h1 className="color-red big-text centered-content-data">Whoops...</h1>
               <p className="color-gray small-line-spacing">
                 We're unable to find data you're looking for.
               </p>
             </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Search);
