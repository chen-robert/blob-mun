import React from "react";
import {connect} from "react-redux";

import {Card, CardContent, Typography, Grid} from "@material-ui/core";

import MUN from "./MUN";

const MUNWrapper = ({currStateDefined}) => {
  if(currStateDefined)return <MUN/>
  return (
  <Grid 
    style={{height: "100%"}}
    container
    direction="row"
    justify="center"
    alignItems="center"
  >
    <Card style={{maxWidth: "50vw"}}>
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          Uh oh!
        </Typography>
        <Typography component="p">
          Something messed up. It looks like this committee doesn't exist! 
        </Typography>
      </CardContent>
    </Card>
  </Grid>
  );
}
const MUNWrapperConnector = connect(
  (state, ownProps) => ({
    currStateDefined: state.allStates[ownProps.match.params.id] !== undefined      
  })
)(MUNWrapper);

export default MUNWrapperConnector;