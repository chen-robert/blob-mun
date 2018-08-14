import React from "react";

import {Switch, Route} from "react-router-dom";

import MUN from "./MUN";
import Login from "./Login";

const App = () => {
  return <Switch>
    <Route exact path="/" component={MUN}/>
    <Route exact path="/login" component={Login}/>
  </Switch>
}

export default App;