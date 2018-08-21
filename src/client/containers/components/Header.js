import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import HeadCount from "./HeadCount";

const Header = ({committeeName, sessionName, setCommitteeName}) => {
  return <div id="header">
    <div
    id="committee-name"
    onClick={
      () => {
        const name = prompt("Committee Name").trim();
        if(name){
          setCommitteeName(name);
        }
      }
    }
    >
      <h3>{committeeName}</h3>
      <HeadCount count={12}/>
    </div>
    
    <div id="session-name">
      {sessionName}
    </div>
  </div>;
}

export default Header;
