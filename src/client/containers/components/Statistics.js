import React from "react";
import {connect} from "react-redux";
import {Typography, Switch, FormGroup, FormControlLabel, Button} from "@material-ui/core";

class Statistics extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      gToL: true
    }
  }
  render() {
    const {stats, reset} = this.props;
    const displayed = ["primarySpeakers", "secondarySpeakers", "singleSpeaker", "moderated"];
    const displayName = ["Primary", "Secondary", "Single", "Moderated"]
    const colors = ["#669", "#77a", "#88b", "#99c"];
    
    const totalSpeakingTime = (obj) => displayed.map((name) => obj[name]).reduce((a, b) => a + b);
    const total = Object.keys(stats).map((key) => stats[key]).map(totalSpeakingTime)
      .reduce((a, b) => a + b, 0);
    
    
    const sortedByTime = Object.keys(stats).sort(
      (a, b) => this.state.gToL ^ (totalSpeakingTime(stats[a]) > totalSpeakingTime(stats[b])));
    return (
    <div>
      <div className="content" style={{overflowY: "auto"}}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.gToL}
                onChange={(e) => this.setState({gToL: e.target.checked})}
              />
            }
            label="Greatest To Least"
          />
        </FormGroup>
        <div style={{width: "80%", margin: "0 auto"}}>
        {
          displayName.map((name, i) => {
            const width = `${100 / displayed.length}%`;
            const backgroundColor = colors[i];
            return <span key={name} style={{width, backgroundColor, color: "white", display: "inline-block"}}>{name}</span>
          })
        }
        </div>
      { 
        sortedByTime.length === 0 || total === 0? 
        <Typography component="p">Looks like nobody has spoke yet!</Typography>
        : 
        sortedByTime.map((name) => {
          const stat = stats[name];
          return (
          <div className="stats-wrapper" key={name}>
            <div className="stats-text">
              <Typography component="p">{name}</Typography>
            </div>
            <div className="stats-bar">
            {
              displayed.map((room, i) => {
                const width = `${100 * stat[room] / total}%`;
                const backgroundColor = colors[i];
                return (
                <div className="stats-part" key={`${name}-${room}`} style={{width, backgroundColor}}/>
                )
              })
            }
            </div>
          </div>
          )
        })
      }
      </div>
      <div style={{height: "8px"}}/>
      <Button variant="contained"
      onClick={
        () => confirm("Reset all data?") && reset()
      }>
        Reset
      </Button>
    </div>
    );
  }
} 

export default Statistics;