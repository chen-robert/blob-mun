import React, {Component} from "react";

import {connect} from "react-redux";

import {changeSessionData} from "client/actions";

import Timer from "./Timer";

import {Grid, Button} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

class SpeakingSession extends Component{  
  setState(delta){
    this.props.changeState(delta);
  }
  componentDidMount(){
    
    const granularity = 250;
    this.timer = setInterval(() => {
      const {data} = this.props;
      if(!data.paused){
        this.setState({
          timer: data.timer + granularity,
          speakingTimer: data.speakingTimer + granularity
        })        
      }
    }
    , granularity);
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  render(){
    const {names, data} = this.props;
    const {timer, speakingTimer, total, speakingTotal, currentSpeaker, topic} = data;
    
    const formatMillis = (millis) => {
      const secs = Math.floor(millis / 1000);
      
      let timeSecs = secs % 60;
      const timeMins = Math.floor(secs / 60);
      
      if(timeSecs < 10)timeSecs = "0" + timeSecs;
      
      return timeMins + ":" + timeSecs;
    }
    return <div className="content">
      <h1>{topic}</h1>
      <Grid container spacing={16}>
        <Grid item xs={3}>
          <div>
            <span className="button-container">
              <Button 
              onClick={
                () => this.setState({paused: !data.paused})
              }
              variant="fab" color="primary" aria-label="Add">
                <Icon>{data.paused? "play_arrow": "pause"}</Icon>
              </Button>
            </span>
            <span className="button-container">
              <Button 
              onClick={
                () => this.setState({
                  paused: true,
                  speakingTimer: 0,
                  timer: 0
                })
              }
              variant="contained">
                Reset
              </Button>
            </span>
          </div>
        </Grid>
        <Grid item xs={6}>
          <h3>{currentSpeaker}</h3>
          <div className="timer">{formatMillis(Math.min(speakingTimer, 1000 * speakingTotal)) + 
            "/" + formatMillis(1000 * speakingTotal)}</div>
          <Timer elapsedTime={speakingTimer} total={speakingTotal}/>
          <div style={{height: "10px"}} />
          <Timer elapsedTime={timer} total={total}/>
          <div className="timer">{formatMillis(Math.min(timer, 1000 * total)) + 
            "/" + formatMillis(1000 * total)}</div>
        </Grid>
        
        <Grid item xs={3}>
          
          <div className="table-container">
            <table className="table">
              <tbody>
                {
                  names.map((name) => {
                    return <tr 
                    key={name}
                    onClick={
                      () => this.setState({currentSpeaker: name, speakingTimer: 0})
                    }
                    >  
                      <td>
                      {name}
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </Grid>
      </Grid>
    </div>;
    
  }
}

const SpeakingSessionConnector = connect(
  (state) => ({
    names: state.delegates,
    data: state["moderated"]
  }),
  (dispatch) => ({
    changeState: (delta) => dispatch(changeSessionData("moderated", delta))
  })
)(SpeakingSession);


export default SpeakingSessionConnector;