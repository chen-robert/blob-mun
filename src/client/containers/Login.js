import React, {Component} from "react";

import {AppBar, Tabs, Tab, Card, CardContent, Grid} from "@material-ui/core";

import classNames from "classnames";

import LoginForm from "./components/login/LoginForm";
import SignUpForm from "./components/login/SignUpForm";


class Login extends Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      index: 0,
      popupText: "",
      showPopup: false
    }
  }
  render(){
    let popupTimeout;
    
    const {history} = this.props;
    
    const popup = (text) => {
      clearTimeout(popupTimeout);
      
      this.setState({popupText: text, showPopup: true});
      popupTimeout = setTimeout(() => this.setState({showPopup: false}), 3000);
    }
    
    const tabs = [
      <LoginForm popup={popup} redirect={() => history.push("/dashboard")}/>, 
      <SignUpForm popup={popup} switchToLogin={() => this.setState({index: 0})}/>
    ];
    
    return (
    <Grid 
      style={{height: "100%"}}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Card className="login-form">
        <AppBar position="static" color="default"> 
          <Tabs
            value={this.state.index}
            onChange={
              (e, val) => this.setState({index: val})
            }
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Login"/>
            <Tab label="Sign Up"/>
          </Tabs>
        </AppBar>
        <CardContent>
          {tabs[this.state.index]}
        </CardContent>
      </Card>
      <div className={
        classNames({
          popup: true,
          toggled: this.state.showPopup
        })
      }>{this.state.popupText}</div>
    </Grid>
    );
  }
}

export default Login;