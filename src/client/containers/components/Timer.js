import React, {Component} from "react";

import {LinearProgress} from "@material-ui/core";

import {connect} from "react-redux";


const Timer = ({elapsedTime, total}) => {
  const totalMillis = total * 1000;
  
  const percentage = 100 * elapsedTime / totalMillis;
  
  return <LinearProgress color={percentage > 100? "secondary": "primary"} variant="determinate" value={percentage} />
}


export default Timer;