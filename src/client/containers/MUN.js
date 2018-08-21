import React from "react";
import classNames from "classnames";
import {Grid, Card, CardContent} from "@material-ui/core"
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {toggleCollapse, setCommitteeName, setSession, clearSpeakingData} from "client/actions";
import Header from "./components/Header";
import Buttons from "./components/Buttons";
import RollCall from "./components/RollCall";
import Motions from "./components/Motions";
import SideBar from "./components/SideBar";
import Statistics from "./components/Statistics";
import {Moderated, Unmoderated, PrimarySpeakersList, SecondarySpeakersList, SingleSpeaker} from "./components/SpeakingSession";

const allowOverflow = {
  overflow: "visible"
}

const MUN = ({currState, toggleCollapse, setCommitteeName, setSession, clearSpeakingData}) => {
  const {collapsed, sessionName, committeeName, speakingStats} = currState;
  const nameToJSX = {
    "Roll Call": <RollCall/>,
    "Motions": <Motions/>,
    "Primary Speakers List": <PrimarySpeakersList/>,
    "Secondary Speakers List": <SecondarySpeakersList/>,
    "Single Speaker": <SingleSpeaker/>,
    "Moderated Caucus": <Moderated/>,
    "Unmoderated Caucus": <Unmoderated/>,
    "Statistics": <Statistics stats={speakingStats} reset={clearSpeakingData}/>
  }
  return <div style={{height: "100%"}}>
    <div id="main-content" 
      onClick={() => toggleCollapse(false)}
      className={
        classNames({
          "collapsed": collapsed
        })
      }
    >
      <Header
        committeeName={committeeName}
        sessionName={sessionName}
        setCommitteeName={setCommitteeName}
      />
      <div className="header-padding" />
      <div className="centered-parent">
        <Card className="centered" style={allowOverflow}>
          <CardContent style={allowOverflow}>
          {
            nameToJSX[sessionName]
          }
          </CardContent>
        </Card>
      </div>
    </div>
    <div id="sidebar" className={
        classNames({
          "collapsed": !collapsed
        })
      }>
      <div className="header-padding" />
      <SideBar 
        names={Object.keys(nameToJSX)}
        currSession={sessionName}
        setSession={setSession}
      />
    </div>
    <Buttons 
      toggleCollapse={() => toggleCollapse()}
    />
  
  </div>;
}

const MUNConnector = withRouter(connect(
  (state, ownProps) => ({
    currState: state.allStates[ownProps.match.params.id]
  }),
  (dispatch, ownProps) => ({
    toggleCollapse: (val) => dispatch(toggleCollapse(val, ownProps.match.params.id)),
    setCommitteeName: (name) => dispatch(setCommitteeName(name, ownProps.match.params.id)),
    setSession: (session) => dispatch(setSession(session, ownProps.match.params.id)),
    clearSpeakingData: () => dispatch(clearSpeakingData(ownProps.match.params.id))
  })
)(MUN));

export default MUNConnector;