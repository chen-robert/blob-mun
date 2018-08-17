import React from "react";

const Header = ({committeeName, sessionName, toggleCollapse}) => {
  return <div id="header">
    <h3 id="committee-name">{committeeName}</h3>
    <div id="session-name">
      {sessionName}
    </div>
  </div>;
}

export default Header;