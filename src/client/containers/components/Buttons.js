import React from "react";

const Buttons = ({toggleCollapse}) => {
  return <button 
    id="sidebar-button" 
    onClick={() => toggleCollapse()}>
    LOL
  </button>;
}

export default Buttons;