import React, { Component } from 'react';
import {Route, Switch, BrowserRouter, NavLink} from "react-router-dom";
import { browserHistory } from "react-dom";
import './App.css';

import Search from "./components/Search";
import Login from "./components/Login";
import Register from "./components/Register";
import {Header} from "./components/Header";
import {NotFound} from "./components/NotFound";

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Projects from "./containers/Projects";
import ProjectInfo from "./containers/ProjectInfo";
import {MdChevronRight} from "react-icons/md";
import {FaGhost} from "react-icons/fa";

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      drawerOpened:false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer(){
    this.setState({
      drawerOpened: !this.state.drawerOpened,
    });
  };


  render() {

    let menuLinks = [
      {path:"/register", label:"Register"},
      {path:"/login", label:"Login"},
      {path:"/projects", label:"Projects"},
    ];

    return (
      <BrowserRouter history={browserHistory}>
      <div>
         <Drawer open={this.state.drawerOpened} onClose={this.toggleDrawer}>
           <div
             tabIndex={0}
             role="button"
             onClick={this.toggleDrawer}
             onKeyDown={this.toggleDrawer}>
             <ul className="header-menu drawer-header">
               <li>
                 <NavLink activeClassName="activeLink" to="/">
                   <span className="logo-text-header"><span className="logo-ghost-icon"><FaGhost size={25}/></span> localghost</span>
                 </NavLink>
               </li>
               <li>
                 <button onClick={this.toggleDrawer} className="open-drawer-button"><MdChevronRight size={30}/> </button>
               </li>
             </ul>
             <List className="no-padding side-menu-list">
               {menuLinks.map((link, index) => (
                 <ListItem  button key={index}>
                   <NavLink to={link.path}>{link.label}</NavLink>
                 </ListItem>
               ))}
             </List>
           </div>
        </Drawer>
        <Header toggleDrawer={this.toggleDrawer}/>
        <div className="website-content">
          <Switch>
            <Route exact path="/" component={Projects}/>
            <Route path="/search" component={Search} />
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/projects" component={Projects} exact/>
            <Route path="/projects/:id" component={ProjectInfo}/>
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
  </BrowserRouter>
  );
  }
}

export default App;
