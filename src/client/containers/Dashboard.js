import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  List,
  Typography,
  Button
} from "@material-ui/core";
import { createNewState } from "client/actions";
import AddIcon from "@material-ui/icons/Add";
import ForceSignin from "./components/ForceSignin";
import DashboardRow from "./components/DashboardRow";

const Dashboard = ({ states, createNewState, history }) => {
  const createNewCommittee = () => {
    const name = prompt("Name");

    createNewState(name);
  };
  return (
    <Grid
      style={{ height: "100%" }}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <ForceSignin />
      <Card style={{ overflow: "visible" }}>
        <CardContent>
          <Typography variant="headline" component="h3">
            Committees
          </Typography>
        </CardContent>
        <List component="nav">
          {Object.keys(states).map(key => {
            const state = states[key];
            return (
              <DashboardRow
                key={key}
                state={state}
                redirect={() => history.push(`/committee/${key}`)}
              />
            );
          })}
        </List>
        <div style={{ position: "relative" }}>
          <div className="fab-button">
            <Button
              onClick={createNewCommittee}
              variant="fab"
              color="primary"
              aria-label="Add"
              className="fab-button"
            >
              <AddIcon />
            </Button>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

const DashboardConnector = connect(
  state => ({
    states: state.allStates
  }),
  dispatch => ({
    createNewState: name => dispatch(createNewState(name))
  })
)(Dashboard);

export default DashboardConnector;
