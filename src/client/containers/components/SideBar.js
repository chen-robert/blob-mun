import React from "react";
import classNames from "classnames";
import { List, ListItem, ListItemText } from "@material-ui/core";

const SideBar = ({ names, currSession, setSession }) => {
  return (
    <List component="nav" className="sidebar-list">
      {names.map(name => {
        return (
          <ListItem
            button
            onClick={() => setSession(name)}
            key={name}
            className={classNames({
              "sidebar-item": true,
              toggled: name === currSession
            })}
          >
            <ListItemText primary={name} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default SideBar;
