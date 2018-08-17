import {connect} from "react-redux";

import {toggleCollapse} from "client/actions";

import Header from "./components/Header.js";

const HeaderConnector = connect(
  (state) => ({
    comitteeName: state.currState.comitteeName,
    sessionName: state.currState.sessionName
  })
)(Header);

export default HeaderConnector;
