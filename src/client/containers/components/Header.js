import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {Typography} from "@material-ui/core";
import HeadCount from "./HeadCount";

const Header = ({committeeName, sessionName, setCommitteeName, headCount}) => {
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
      <Typography variant="headline" component="h3">{committeeName}</Typography>
      <HeadCount count={headCount}/>
    </div>
    
    <div id="session-name">
      {sessionName}
    </div>
  </div>;
}

export default Header;
