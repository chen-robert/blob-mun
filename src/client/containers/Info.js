import React from "react";

import {Grid, Card, CardContent, CardActions, Typography, Button} from "@material-ui/core";

const Info = ({history}) => {
  return (
  <Grid 
      style={{height: "100%"}}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <Typography variant="headline" component="h2">
            Blob Mun
          </Typography>
          <Typography component="p">
            A ChairMUN clone. WIP.
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => history.push("/dashboard")}>Dashboard</Button>
        </CardActions>
      </Card>
    </Grid>
  </Grid>
  );
}

export default Info;