import React from "react";

import {TextField, Button} from "@material-ui/core";

const SignUpForm = () => {
  return (
  <form action="/signup" method="POST">
      <div>
        <TextField fullWidth required name="username" label="Username" placeholder="Username"/>
      </div>
      <div>
        <TextField fullWidth required type="email" name="email" label="Email" placeholder="Email"/>
      </div>
      <div>
        <TextField fullWidth required name="password" label="Password" placeholder="Password"/>
      </div>
      <div style={{height: "10px"}}/>
      <div>
        <Button fullWidth type="submit" variant="contained" color="primary" aria-label="Sign Up">Sign Up</Button>
      </div>
  </form>
  );
}

export default SignUpForm;