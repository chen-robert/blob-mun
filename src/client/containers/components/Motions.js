import React, {Component} from "react";

import {changeSessionData, setSession} from "client/actions";

import {TextField, RadioGroup, FormControlLabel, Radio, Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Select from "react-select";

import {connect} from "react-redux";

class Motions extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      delegation: "",
      sessionType: "",
      duration: "",
      speakingTime: "",
      topic: ""
    }
  }
  render(){
    const {delegation, sessionType, duration, speakingTime, topic} = this.state;
    const {delegations, changeState, setSession} = this.props;
    const options = delegations.map((name) => {
      return {
        value: name,
        label: name
      }
    });
    
    return <div>
      <Select
        placeholder="Delegation"
        isSearchable={true}
        options={options}
        defaultValue={delegation}
        onChange={
          (e) => this.setState({delegation: e.value})
        }
      />
      <RadioGroup
        value={sessionType}
        onChange={
          (e) => this.setState({sessionType: e.target.value})
        }
      >
        <FormControlLabel value="mod" control={<Radio />} label="Moderated" />
        <FormControlLabel value="unmod" control={<Radio />} label="Unmoderated" />
        <FormControlLabel value="other" control={<Radio />} label="?????" />
      </RadioGroup>
      <div>
        <TextField
          value={duration}
          label="Duration"
          placeholder="mm:ss"
          onChange={
            (e) => {
              if(e.target.value === "" || /^[:|\d]+$/.test(e.target.value)){
                this.setState({duration: e.target.value});              
              }
            }
          }
        />
        <span style={{display: "inline-block", width: "10px"}}/>
        <TextField
          value={speakingTime}
          label="Speaking Times"
          placeholder="mm:ss"
          onChange={
            (e) => {
              if(e.target.value === "" || /^[:|\d]+$/.test(e.target.value)){
                this.setState({speakingTime: e.target.value});              
              }
            }
          }
        />
      </div>
      <div>
        <TextField
          style={{width: "100%"}}
          value={topic}
          label="Topic"
          onChange={
            (e) => this.setState({topic: e.target.value})
          }
        />
      </div>
      <div>
        <Button 
        onClick={
          () => {
            switch(sessionType){
              case "mod":
                changeState("moderated",
                  {
                    timer: 0,
                    speakingTimer: 0,
                    speakingTotal: speakingTime,
                    total: duration,
                    paused: true,
                    currentSpeaker: delegation,
                    topic: topic
                  }
                )
                this.props.setSession("Moderated");
                
                break;
            }
          }
        }
        variant="fab" color="primary" aria-label="Add">
          <AddIcon />
        </Button>
      </div>
    </div>
  }
}

const MotionsConnector = connect(
  (state) => ({
    delegations: state.delegates
  }),
  (dispatch) => ({
    changeState: (name, delta) => dispatch(changeSessionData(name, delta)),
    setSession: (session) => dispatch(setSession(session))
  })
)(Motions);

export default MotionsConnector;