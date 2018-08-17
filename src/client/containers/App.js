import React from "react";

import {Switch, Route} from "react-router-dom";

import MUN from "./MUN";
import Login from "./Login";
import Dashboard from "./Dashboard";

const App = () => {
  return <Switch>
    <Route exact path="/" component={MUN}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/dashboard" component={Dashboard}/>
  </Switch>
}

export default App;