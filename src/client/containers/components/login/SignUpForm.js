import React, {Component} from "react";
import axios from "axios";

import {TextField, Button} from "@material-ui/core";

class SignUpForm extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      username: "",
      email: "",
      password: ""
    }
  }
  render() {
    const {switchToLogin, popup} = this.props;
    return (
    <form onSubmit={
      (e) => {
        e.preventDefault();
        
        axios.post("/signup", this.state)
          .then((res) => {
            popup(res.data);
            switchToLogin();
          })
          .catch((err) => console.log(err));
      }
    }>
        <div>
          <TextField fullWidth required name="username" label="Username" placeholder="Username"
          onChange={(e) => this.setState({username: e.target.value})}/>
        </div>
        <div>
          <TextField fullWidth required type="email" name="email" label="Email" placeholder="Email"
          onChange={(e) => this.setState({email: e.target.value})}/>
        </div>
        <div>
          <TextField fullWidth required name="password" label="Password" placeholder="Password"
          onChange={(e) => this.setState({password: e.target.value})}/>
        </div>
        <div style={{height: "10px"}}/>
        <div>
          <Button fullWidth type="submit" variant="contained" color="primary" aria-label="Sign Up">Sign Up</Button>
        </div>
    </form>
    );
  }
}

export default SignUpForm;