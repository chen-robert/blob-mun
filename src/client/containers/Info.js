import React from "react";

import {
  AppBar,
  Toolbar,
  Icon,
  Grid,
  CardContent,
  Typography,
  Button
} from "@material-ui/core";

const Info = ({ history }) => {
  const redirectLogin = () => history.push("/login");
  const openGithub = () =>
    window.open("https://github.com/chen-robert/blob-mun");
  return (
    <div style={{ height: "100%", overflowX: "hidden" }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Blob Mun
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid
          container
          style={{
            background: "linear-gradient(to right, #56ccf2, #2f80ed)",
            minHeight: "400px"
          }}
          direction="row"
          justify="center"
          alignItems="center"
        >
          {/*Padding*/}
          <Grid item xs={3}>
            <div>
              <div>
                <Typography variant="headline" component="h2" color="default">
                  A ChairMun Clone
                </Typography>
              </div>
              <div>
                <Typography component="p" color="default">
                  A <i>revolutionary</i> redesign of ChairMun.
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={3} />
        </Grid>
        <Grid
          container
          style={{
            background: "linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4)",
            minHeight: "200px"
          }}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={3} md={2}>
            <div>
              <div>
                <Typography variant="headline" component="h2" color="default">
                  Cloud Storage
                </Typography>
              </div>
              <div>
                <Typography component="p" color="default">
                  All your information is stored on the cloud. Even if you use
                  two different computers, it'll all be saved.
                </Typography>
              </div>
            </div>
          </Grid>
          {/*Padding*/}
          <Grid item xs={1} />
          <Grid item xs={3} md={2}>
            <Icon style={{ fontSize: 72 }}>cloud_queue</Icon>
          </Grid>
        </Grid>
        <Grid
          container
          style={{
            background: "linear-gradient(to right, #2980b9, #6dd5fa, #ffffff)",
            minHeight: "200px"
          }}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={3} md={2}>
            <Button variant="contained" color="default" onClick={redirectLogin}>
              Join Today
            </Button>
          </Grid>
          {/*Padding*/}
          <Grid item xs={1} />
          <Grid item xs={3} md={2}>
            <div>
              <div>
                <Typography variant="headline" component="h2">
                  Join Today
                </Typography>
              </div>
              <div>
                <Typography component="p">
                  BlobMUN. The newest MUN Clone. It's a wonderful thing!
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          style={{
            background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
            minHeight: "200px"
          }}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={3} md={2}>
            <div>
              <div>
                <Typography
                  variant="headline"
                  component="h2"
                  style={{ color: "#d9dbdd" }}
                >
                  Contribute
                </Typography>
              </div>
              <div>
                <Typography component="p" style={{ color: "#d9dbdd" }}>
                  All of our code is hosted on Github. We appreciate all
                  contributions!
                </Typography>
              </div>
            </div>
          </Grid>
          {/*Padding*/}
          <Grid item xs={1} />
          <Grid item xs={3} md={2}>
            <Button variant="contained" color="default" onClick={openGithub}>
              Github
            </Button>
          </Grid>
        </Grid>
        {/*
        Footer
      */}
        <Grid
          container
          style={{
            backgroundColor: "#8993a3"
          }}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={9}>
            <CardContent>
              <Typography component="p" style={{ color: "#d9dbdd" }}>
                Copyright Robert Chen.
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Info;
