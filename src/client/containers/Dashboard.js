import React from "react";
import {connect} from "react-redux";
import {Grid, Card, CardContent, List, Typography} from "@material-ui/core";

import DashboardRow from "./components/DashboardRow";

const Dashboard = ({states, history}) => {
  return (
  <Grid 
    style={{height: "100%"}}
    container
    direction="row"
    justify="center"
    alignItems="center"
  >
    <Card>
      <CardContent>
        <Typography variant="headline" component="h3">
          Committees
        </Typography>
      </CardContent>
      <List component="nav">
      {
        Object.keys(states).map((key) => {
          const state = states[key];
          return <DashboardRow key={key} state={state} redirect={
            () => history.push(`/committee/${key}`)
          }/>
        })
      }
      </List>    
    </Card>
  </Grid>
  );
}

const DashboardConnector = connect(
  (state) => ({
    states: state.allStates
  })
)(Dashboard);

export default DashboardConnector;