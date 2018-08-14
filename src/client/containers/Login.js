import React, {Component} from "react";

import {AppBar, Tabs, Tab, Card, CardContent, Grid} from "@material-ui/core";

import LoginForm from "./components/login/LoginForm";
import SignUpForm from "./components/login/SignUpForm";

const tabs = [<LoginForm/>, <SignUpForm/>];

class Login extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      index: 0
    }
  }
  render(){
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
    </Grid>);
  }
}

export default Login;