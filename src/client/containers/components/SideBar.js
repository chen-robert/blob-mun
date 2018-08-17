import React from "react";
import classNames from "classnames";
import {withRouter} from "react-router";
import {connect} from "react-redux";

import {setSession} from "client/actions";

const SideBar = ({names, currSession, setSession}) => {
  return <ul>
  {
    names.map((name) => {
      return <li 
      onClick={
        () => setSession(name)
      }
      key={name}
      className={
        classNames({
          "toggled": name === currSession
        })
      }
      >
        {name}
      </li>
    })
  }
  </ul>
}
const SideBarConnector = withRouter(connect(
  (state, ownProps) => ({
    currSession: state.allStates[ownProps.match.params.id].sessionName
  }),
  (dispatch, ownProps) => ({
    setSession: (session) => dispatch(setSession(session, ownProps.match.params.id))
  })
)(SideBar));

export default SideBarConnector;