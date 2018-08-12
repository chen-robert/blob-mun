import {connect} from "react-redux";

import {toggleCollapse} from "client/actions";

import Buttons from "./components/Buttons.js";

const ButtonConnector = connect(
  (state) => ({}),
  (dispatch) => ({
    toggleCollapse: () => dispatch(toggleCollapse()),
  })
)(Buttons);

export default ButtonConnector;
