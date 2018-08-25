import React from "react";
import axios from "axios";
import ServerUpdater from "client/ServerUpdater";
import { connect } from "react-redux";

const ForceSignin = ({ history, loadServerState }) => {
  const loadData = () => {
    ServerUpdater.loadData((err, data) => {
      if (err) return;

      if (data) {
        loadServerState(data);
      }
    });
  };
  axios
    .get("/signedin")
    .then(loadData)
    .catch(() => history.push("/login"));
  return <div />;
};

const ForceSigninConnector = connect(
  () => ({}),
  dispatch => ({
    loadServerState: data =>
      dispatch({
        type: "LOAD_SERVER_STATE",
        data: data
      })
  })
)(ForceSignin);

export default ForceSigninConnector;
