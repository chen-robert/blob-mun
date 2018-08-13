import React from "react";

import {Button, Icon} from "@material-ui/core";

const Buttons = ({toggleCollapse}) => {
  return <div>
    <div className="sidebar-button">
      <Button 
        variant="fab" color="primary" aria-label="Menu"
        onClick={
          (e) => {
            toggleCollapse();
            e.stopPropagation();
          }
        }>
          <Icon>menu</Icon>
        </Button>
      </div>
    </div>
}

export default Buttons;