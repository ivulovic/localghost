import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom";
import { browserHistory } from "react-dom";
import './App.css';

import Home from "./components/Home";
import {Menu} from "./components/Menu";
import {NotFound} from "./components/NotFound";
import {Other} from "./components/Other";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter history={browserHistory}>
          <div>
            <Menu />
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/other" component={Other}/>
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
