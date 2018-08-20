import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";

const Header = ({committeeName, sessionName, setCommitteeName}) => {
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

export default Header;
