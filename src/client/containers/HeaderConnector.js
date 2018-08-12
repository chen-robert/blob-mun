import {connect} from "react-redux";

import {toggleCollapse} from "client/actions";

import Header from "./components/Header.js";

const HeaderConnector = connect(
  (state) => ({
    comitteeName: state.comitteeName,
    sessionName: state.sessionName
  })
)(Header);

export default HeaderConnector;
