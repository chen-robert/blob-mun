import React from "react";

import {ListItem, ListItemText} from "@material-ui/core";

const DashboardRow = ({state, redirect}) => {
  return (
  <ListItem button onClick={redirect}>
    <ListItemText primary={state.committeeName}/>
  </ListItem>
  );
}

export default DashboardRow;