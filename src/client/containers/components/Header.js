import React from "react";
import {connect} from "react-redux";

import {toggleCollapse} from "client/actions";
import {withRouter} from "react-router";

const Header = ({committeeName, sessionName, toggleCollapse, setCommitteeName}) => {
  return <div id="header">
    <h3 
    id="committee-name"
    onClick={() => setCommitteeName(prompt("Committee Name"))}
    >{committeeName}</h3>
    <div id="session-name">
      {sessionName}
    </div>
  </div>;
}

const HeaderConnector = withRouter(connect(
  (state, ownProps) => ({
    committeeName: state.allStates[ownProps.match.params.id].committeeName,
    sessionName: state.allStates[ownProps.match.params.id].sessionName
  })
)(Header));

export default HeaderConnector;
