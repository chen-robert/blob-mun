import React from "react";
import {connect} from "react-redux";

import {toggleCollapse} from "client/actions";
import {withRouter} from "react-router";

const Header = ({committeeName, sessionName, toggleCollapse, setCommitteeName}) => {
  return <div id="header">
    <h3 
    id="committee-name"
    onClick={
      () => {
        const name = prompt("Committee Name").trim();
        if(name){
          setCommitteeName(name);
        }
      }
    }
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
