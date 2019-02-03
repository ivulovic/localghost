import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom";
import { browserHistory } from "react-dom";
import Search from "./components/Search";
import Login from "./components/Login";
import Register from "./components/Register";
import {Header} from "./components/Header";
import {NotFound} from "./components/NotFound";
import Projects from "./containers/Projects";
class App extends Component {
  render() {
    return (
      <BrowserRouter history={browserHistory}>
       <div>
         <Header/>
         <div className="website-content">
           <Switch>
             <Route exact path="/" component={Projects}/>
             <Route path="/search" component={Search} />
             <Route path="/login" component={Login}/>
             <Route path="/register" component={Register}/>
             <Route exact path="/projects" component={Projects}/>
             <Route path="/projects/:id" component={Projects}/>
             <Route component={NotFound} />
           </Switch>
         </div>
       </div>
      </BrowserRouter>
   );
  }
}

export default App;
