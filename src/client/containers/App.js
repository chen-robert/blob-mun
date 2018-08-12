import React from "react";

import classNames from "classnames";

import {Grid} from "@material-ui/core"

import Header from "./HeaderConnector";
import Buttons from "./ButtonConnector";

import RollCall from "./components/RollCall";
import SideBar from "./components/SideBar";

const nameToJSX = {
  "Roll Call": <RollCall />,
  "Blah": null
}

const App = ({collapsed, currSession}) => {
  return <div>
    <div id="main-content" className={
        classNames({
          "collapsed": collapsed
        })
      }>
      <Header />
      <div className="header-padding" />
      <div className="centered-parent">
        <div className="centered">
          {
            nameToJSX[currSession]
          }
        </div>
      </div>
    </div>
    <div id="side-bar" className={
        classNames({
          "collapsed": !collapsed
        })
      }>
      <div className="header-padding" />
      <SideBar names={Object.keys(nameToJSX)}/>
    </div>
    <Buttons />
  
  </div>;
}

export default App;