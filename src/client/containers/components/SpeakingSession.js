import React, {Component} from "react";
import {connect} from "react-redux";
import Select from "react-select";
import classNames from "classnames";
import DraggableList from "react-draggable-list";
import {withRouter} from "react-router";

import {Grid, Button, TextField} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

import {changeSessionData, updateItem} from "client/actions";
import DraggableListItem from "./DraggableListItem";
import DelegateTable from "./DelegateTable";
import DateUtils from "utils/date";
import Timer from "./Timer";

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
          type: "UPDATE_TIMER",
          granularity
        })        
      }
    }
    , granularity);
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  render(){
    const {names, type, data, updateItem} = this.props;
    const {currentSpeaker, topic, speakers} = data;
    
    const {speakingTimerStr, timerStr, speakingTotalStr, totalStr} = {
      speakingTimerStr: data.speakingTimer, 
      timerStr: data.timer, 
      speakingTotalStr: data.speakingTotal, 
      totalStr: data.total
    };
    
    const speakingTimer = DateUtils.parseStr(speakingTimerStr);
    const timer = DateUtils.parseStr(timerStr);
    const speakingTotal = DateUtils.parseStr(speakingTotalStr) || 1 * 60;
    const total = DateUtils.parseStr(totalStr) || 10 * 60;
    
    const codeToName = {
      "U": "unmoderated",
      "M": "moderated",
      //Use the same code because they are all the same
      "P": "primarySpeakers | secondarySpeakers | singleSpeaker",
      "S": ""
    }
    const isCode = (code) => {
      for(var i = 0; i < code.length; i++){
        if(codeToName[code.charAt(i)].split(" | ").indexOf(type) !== -1){
          return true;
        }
      }
      return false;
      
    }
    const shouldDisplay = (code) => {
      return isCode(code)? "": "hidden";
    }
    
    const formatMillis = (millis) => {
      const secs = Math.floor(millis / 1000); 
      
      let timeSecs = secs % 60;
      const timeMins = Math.floor(secs / 60);
      
      if(timeSecs < 10)timeSecs = "0" + timeSecs;
      
      return timeMins + ":" + timeSecs;
    }
    
    let container;
    
    return <div className="content">
      <div 
        className={"content-banner " + shouldDisplay("UM")}
        onClick={() => this.setState({topic: prompt("Speaking topic")})}
      >
        {topic || "Unknown Topic"}
      </div>
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
            <div className={shouldDisplay("MPS")}>
              <TextField
                value={speakingTotalStr}
                label="Speaking Times"
                placeholder="1:00"
                onChange={
                  (e) => {
                    if(DateUtils.testStr(e.target.value)){
                      this.setState({speakingTotal: e.target.value});              
                    }
                  }
                }
              />
            </div>
            <div className={shouldDisplay("UM")}>
              <TextField
                value={totalStr}
                label="Duration"
                placeholder="10:00"
                onChange={
                  (e) => {
                    if(DateUtils.testStr(e.target.value)){
                      this.setState({total: e.target.value});              
                    }
                  }
                }
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={isCode("U")? 9: 6}>
          
          <div className={shouldDisplay("MPS")}>
            <h3>{isCode("PS")? (speakers[0] !== undefined ? speakers[0].name: ""):currentSpeaker}</h3>
          </div>
          <div style={{height: "50px"}} className={shouldDisplay("UPS")}/>
          <div className={shouldDisplay("MPS")}>
            <div className="timer">{formatMillis(Math.min(speakingTimer, 1000 * speakingTotal)) + 
              "/" + formatMillis(1000 * speakingTotal)}</div>
            <Timer elapsedTime={speakingTimer} total={speakingTotal}/>
          </div>
          <div style={{height: "10px"}} />
          <div className={shouldDisplay("UM")}>
            <Timer elapsedTime={timer} total={total}/>
            <div className="timer">{formatMillis(Math.min(timer, 1000 * total)) + 
              "/" + formatMillis(1000 * total)}</div>
          </div>
        </Grid>
        
        <Grid item xs={3} className={shouldDisplay("MPS")}>
          <div className={shouldDisplay("M")}>
            <Select
              placeholder="Delegation"
              isSearchable={true}
              options={names.map((name) => ({value: name, label: name}))}
              onChange={
                (e) => this.setState({currentSpeaker: e.value, speakingTimer: 0})
              }
            />
          </div>
          <div className={shouldDisplay("PS")}>
            <div className="ontop">
              <Select
                placeholder="Delegation"
                isSearchable={true}
                options={names.map((name) => ({value: name, label: name}))}
                value={null}
                onChange={
                  (e) => this.setState({speakers: [...speakers, {
                    name: e.value, 
                    id: Math.random()
                  }]})
                }
              />
            </div>
            <div style={{height: "10px"}}/>
            <Button 
            onClick={
              () => this.setState({
                paused: true,
                speakingTimer: 0,
                timer: 0
              })
            }
            variant="contained"
            >
              Clear
            </Button>
            <div style={{height: "10px"}}/>
            <div className="draglist"
              ref={(elem) => {
                  if(elem)container = elem;
                }
              }
            >
              <DraggableList
                itemKey="id"
                template={DraggableListItem}
                list={speakers}
                onMoveEnd={(newList) => this.setState({speakers: newList})}
                container={() => container}
                commonProps={{updateItem: updateItem}}
              
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>;
    
  }
}

const createType = (name) => {
  return withRouter(connect(
    (state, ownProps) => ({
      names: state.allStates[ownProps.match.params.id].delegates,
      data: state.allStates[ownProps.match.params.id][name],
      type: name
    }),
    (dispatch, ownProps) => ({
      changeState: (delta) => dispatch(changeSessionData(name, delta, ownProps.match.params.id)),
      updateItem: (item, delta) => dispatch(updateItem(item, delta, ownProps.match.params.id))
    })
  )(SpeakingSession));
}

export const Moderated = createType("moderated");
export const Unmoderated = createType("unmoderated");
export const PrimarySpeakersList = createType("primarySpeakers");
export const SecondarySpeakersList = createType("secondarySpeakers");
export const SingleSpeaker = createType("singleSpeaker");