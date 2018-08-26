import React from "react";
import { Button, Icon } from "@material-ui/core";

const Buttons = ({ toggleCollapse, save }) => {
  return (
    <div>
      <div className="sidebar-button left">
        <Button
          variant="fab"
          color="primary"
          aria-label="Menu"
          onClick={() => {
            save();
          }}
        >
          <Icon>save</Icon>
        </Button>
      </div>
      <div className="sidebar-button right">
        <Button
          variant="fab"
          color="primary"
          aria-label="Menu"
          onClick={e => {
            toggleCollapse();
            e.stopPropagation();
          }}
        >
          <Icon>menu</Icon>
        </Button>
      </div>
    </div>
  );
};

export default Buttons;
