import React from "react";

import {Switch, Route} from "react-router-dom";

import MUN from "./MUNWrapper";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Info from "./Info";

import {CssBaseline} from "@material-ui/core";

const App = () => {
  return (
  <div style={{height: "100%"}}>
    <CssBaseline/>
    <Switch>
      <Route exact path="/" component={Info}/>
      <Route exact path="/committee/:id" component={MUN}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/dashboard" component={Dashboard}/>
    </Switch>
  </div>
  );
}

export default App;