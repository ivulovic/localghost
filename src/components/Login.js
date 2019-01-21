import React from "react";
import {Component} from "react";
import {withRouter} from "react-router-dom";

import {MdError, MdPerson, MdVpnKey} from "react-icons/md";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";

class Login extends Component{

  constructor(props){
    super(props);
    this.state = {
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.usenameField = React.createRef();
    this.passwordField = React.createRef();
  }

  handleSubmit(event){
    event.preventDefault();
    let usenameField = this.usenameField.current.value;
    let passwordField = this.passwordField.current.value;
    if(usenameField && usenameField.trim()){
      if(passwordField && passwordField.trim()){
        this.setState({
          error:undefined
        });
        this.usenameField.current.value = '';
        this.passwordField.current.value = '';
        this.usenameField.current.focus();
        console.log("Both there", usenameField, passwordField);
      } else {
        this.setState({
          error:"Please fill both fields."
        })
      }
    } else {
      this.setState({
        error:"Please fill both fields."
      })
    }
  }

  render(){
    return (
      <div>
        <div className="relative-container">
          <div className="centered-content">
            <h1 className="color-red big-text big-line-spacing centered-content-data">Login</h1>

            <form onSubmit={this.handleSubmit}>
              <div  className="color-gray small-line-spacing">
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <TextField id="username" autoComplete="off" label="How imaginative were You?" inputRef={this.usenameField}
                               InputProps={{
                                 startAdornment: (
                                   <InputAdornment position="start">
                                     <MdPerson />
                                   </InputAdornment>
                                 ),
                               }}/>
                  </Grid>
                </Grid>
              </div>

              <div className="margin-top color-gray small-line-spacing">
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <TextField type="password" autoComplete="off" id="password" label="Password You use everywhere" inputRef={this.passwordField}
                               InputProps={{
                                 startAdornment: (
                                   <InputAdornment position="start">
                                     <MdVpnKey />
                                   </InputAdornment>
                                 ),
                               }}
                    />
                  </Grid>
                </Grid>
              </div>

              <div className={!!this.state.error ? "color-red medium-line-spacing" : "color-red medium-line-spacing not-visible"}>
                <span className="icon-positioned"><MdError /></span> <strong> {this.state.error}</strong>
              </div>

              <div className="hidden">
                <button className="margin-top btn-submit">
                  Register
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);
