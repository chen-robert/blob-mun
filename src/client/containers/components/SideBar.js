import React from "react";

import classNames from "classnames";

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
const SideBarConnector = connect(
  (state) => ({
    currSession: state.sessionName
  }),
  (dispatch) => ({
    setSession: (session) => dispatch(setSession(session))
  })
)(SideBar);

export default SideBarConnector;