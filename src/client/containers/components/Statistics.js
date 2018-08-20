import React from "react";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";

const Statistics = ({stats}) => {
  const displayed = ["moderated", "primarySpeakers", "secondarySpeakers", "singleSpeaker"];
  const colors = ["#000", "#888", "#bbb", "#eee"];
  
  const totalSpeakingTime = (obj) => displayed.map((name) => obj[name]).reduce((a, b) => a + b);
  const total = Object.keys(stats).map((key) => stats[key]).map(totalSpeakingTime)
    .reduce((a, b) => a + b, 0);
  
  
  const sortedByTime = Object.keys(stats).sort((a, b) => totalSpeakingTime(stats[a]) < totalSpeakingTime(stats[b]));
  return (
  <div className="content" style={{overflowY: "auto"}}>
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
  );
}

export default Statistics;