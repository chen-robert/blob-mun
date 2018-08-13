import React from "react";

import classNames from "classnames";

import {Grid, Card, CardContent} from "@material-ui/core"

import {connect} from "react-redux";

import {toggleCollapse} from "client/actions";

import Header from "./HeaderConnector";
import Buttons from "./ButtonConnector";

import RollCall from "./components/RollCall";
import Motions from "./components/Motions";
import SideBar from "./components/SideBar";
import {Moderated, Unmoderated, PrimarySpeakersList} from "./components/SpeakingSession";

const nameToJSX = {
  "Roll Call": <RollCall/>,
  "Motions": <Motions/>,
  "Primary Speakers List": <PrimarySpeakersList/>,
  "Moderated Caucus": <Moderated/>,
  "Unmoderated Caucus": <Unmoderated/>
}

const allowOverflow = {
  overflow: "visible"
}

const App = ({collapsed, currSession, unCollapse}) => {
  return <div>
    <div id="main-content" 
      onClick={() => unCollapse()}
      className={
        classNames({
          "collapsed": collapsed
        })
      }
    >
      <Header />
      <div className="header-padding" />
      <div className="centered-parent">
        <Card className="centered" style={allowOverflow}>
          <CardContent style={allowOverflow}>
          {
            nameToJSX[currSession]
          }
          </CardContent>
        </Card>
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

const AppConnector = connect(
  (state) => ({}),
  (dispatch) => ({
    unCollapse: () => dispatch(toggleCollapse(false))
  })
)(App);
export default AppConnector;