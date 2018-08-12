import React from "react";

import classNames from "classnames";

import {Grid} from "@material-ui/core"

import Header from "./HeaderConnector";
import Buttons from "./ButtonConnector";

import RollCall from "./components/RollCall";

const App = ({collapsed}) => {
  return <div>
    <div id="main-content" className={
        classNames({
          "collapsed": collapsed
        })
      }>
      <Header />
      <div id="header-padding" />
      <div className="centered-parent">
        <div className="centered">
          <RollCall />
        </div>
      </div>
    </div>
    <Buttons />
  
  </div>;
}

export default App;