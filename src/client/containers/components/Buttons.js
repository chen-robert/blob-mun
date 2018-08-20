import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {toggleCollapse} from "client/actions";
import {Button, Icon} from "@material-ui/core";

const Buttons = ({toggleCollapse}) => {
  return (
  <div>
    <div className="sidebar-button left">
      <Button 
        variant="fab" color="primary" aria-label="Menu"
        onClick={
          (e) => {
            toggleCollapse();
            e.stopPropagation();
          }
        }>
        <Icon>settings</Icon>
      </Button>
    </div>
    <div className="sidebar-button right">
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
  );
}

export default Buttons;