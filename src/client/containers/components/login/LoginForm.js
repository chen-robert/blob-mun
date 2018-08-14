import React from "react";

import {TextField, Button} from "@material-ui/core";

const LoginForm = () => {
  return (
  <form action="/login" method="POST">
      <div>
        <TextField fullWidth required name="username" label="Username" placeholder="Username"/>
      </div>
      <div>
        <TextField fullWidth required name="password" label="Password" placeholder="Password"/>
      </div>
      <div style={{height: "10px"}}/>
      <div>
        <Button fullWidth type="submit" variant="contained" color="primary" aria-label="Login">Login</Button>
      </div>
  </form>
  );
}

export default LoginForm;