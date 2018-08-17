import {connect} from "react-redux";

import {toggleCollapse} from "client/actions";
import {withRouter} from "react-router";

import Header from "./components/Header.js";

const HeaderConnector = withRouter(connect(
  (state, ownProps) => ({
    committeeName: state.allStates[ownProps.match.params.id].committeeName,
    sessionName: state.allStates[ownProps.match.params.id].sessionName
  })
)(Header));

export default HeaderConnector;
