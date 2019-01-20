import React, { Component } from 'react';
import {Route, Switch, BrowserRouter, NavLink} from "react-router-dom";
import { browserHistory } from "react-dom";
import './App.css';

import Home from "./components/Home";
import Search from "./components/Search";
import Login from "./components/Login";
import Register from "./components/Register";
import {Header} from "./components/Header";
import {NotFound} from "./components/NotFound";

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import Sources from "./containers/Sources";
import Source from "./containers/Source";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    border: 'none'
  },
  appBar: {
    background:'#303538',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 5,
    marginRight: 5,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 0px',
    background:'#303538',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    minHeight:'60px'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class App extends Component {

  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    let menuLinks = [
      {path:"/register", label:"Register"},
      {path:"/login", label:"Login"},
      {path:"/sources", label:"Sources"},
    ];

    return (
      <BrowserRouter history={browserHistory}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}>
              {/*<MenuIcon />*/}
              <ChevronRightIcon />
            </IconButton>
            <Header/>
            </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <div className="menu-header">
                <strong>MENU</strong>
            </div>
            <span className="toolbar-white-button color-white">
              <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon />}
            </IconButton>
            </span>
          </div>

          <Divider />

          <List className="no-padding side-menu-list">
            {menuLinks.map((link, index) => (
              <ListItem  button key={index}>
                {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
                <NavLink to={link.path}>{link.label}</NavLink>
              </ListItem>
            ))}
          </List>
        </Drawer>

        <main className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}>
          <div className="website-content">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/search" component={Search} />
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
              <Route path="/sources" component={Sources} exact/>
              <Route path="/sources/:id" component={Source}/>
              <Route component={NotFound} />
            </Switch>
          </div>
        </main>
      </div>
  </BrowserRouter>
  );
  }
}

export default withStyles(styles, { withTheme: true })(App);
