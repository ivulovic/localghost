import React from "react";
import { withRouter } from 'react-router-dom'
import {GoSearch} from "react-icons/go";

class SearchBox extends React.Component{

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchField = React.createRef();
  }

  handleSubmit(event){
    event.preventDefault();
    let searchTerm = this.searchField.current.value;
    if(searchTerm && searchTerm.trim()){
      this.props.history.push({ pathname: "/search", search:`term=${searchTerm.trim()}` })
    }
  }

  render(){
    return (
      <li>
        <form onSubmit={this.handleSubmit}>
        <input type="text" id="search-field" className="search-field"  placeholder="Search" ref={this.searchField} autoComplete="off" />
        <label htmlFor="search-field" className="search-icon"><GoSearch /></label>
      </form>
      </li>
    );
  }
}

export default withRouter(SearchBox);
