import React from "react";
import {Component} from "react";
import {withRouter} from "react-router-dom";
import queryString from "query-string";

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
          {path:"#", title:"Badge"},
          {path:"#", title:"Bottom Navigation"},
          {path:"#", title:"Colors"},
          {path:"#", title:"ES-Lint"},
          {path:"#", title:"Range"}
        ]
      },
      {
        category:"Javascript and Redux",
        topics:[
          {path:"#", title:"React-Redux Implementation"},
          {path:"#", title:"Redux in Vanilla JavaScript"},
        ]
      }
      ];
    return (
      <div>
        {!!searchResults.length && <div className="container">
          <span className="color-red big-text">Search term: </span><strong className="color-red big-text">{searchTerm}</strong>
          {searchResults.map((item, i) => (
                <div key={i} className="search-results-wrapper">
                  <div className="search-results-section">
                    <h3 className="search-result-title color-red">{item.category}</h3>
                    <ul className="search-result-list">
                      {item.topics.map((topic, j) => <li key={j}><a href={topic.path} className="small-line-spacing color-gray">{topic.title}</a></li> )}
                    </ul>
                  </div>
                </div>
          ))}
        </div>}

        {!searchResults.length && (
          <div>
           <div className="relative-container">
             <div className="container">
               <span className="color-red big-text">Search term: </span><strong className="color-red big-text">{searchTerm}</strong>
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
