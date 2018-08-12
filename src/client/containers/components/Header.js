import React from "react";

const Header = ({comitteeName, sessionName, toggleCollapse}) => {
  return <div id="header">
    <h3 id="comittee-name">{comitteeName}</h3>
    <div id="session-name">
      {sessionName}
    </div>
  </div>;
}

export default Header;