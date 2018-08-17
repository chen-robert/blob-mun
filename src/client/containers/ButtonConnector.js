import {connect} from "react-redux";
import {withRouter} from "react-router";
import {toggleCollapse} from "client/actions";

import Buttons from "./components/Buttons.js";

const ButtonConnector = withRouter(connect(
  (state) => ({}),
  (dispatch, ownProps) => ({
    toggleCollapse: () => dispatch(toggleCollapse(undefined, ownProps.match.params.id)),
  })
)(Buttons));

export default ButtonConnector;
