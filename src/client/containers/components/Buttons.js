import React from "react";

const Buttons = ({toggleCollapse}) => {
  return <button 
    id="sidebar-button" 
    onClick={
      (e) => {
        toggleCollapse();
        e.stopPropagation();
      }
    }>
    LOL
  </button>;
}

export default Buttons;