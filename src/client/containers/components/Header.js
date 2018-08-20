import React from "react";

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

export default Header;