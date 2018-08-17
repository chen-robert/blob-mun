import React, {Component} from "react";

import classNames from "classnames";

import {connect} from "react-redux";

import {TextField} from "@material-ui/core";

import {setPresent, removeDelegate, addDelegate} from "client/actions";

class RollCall extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      inputVal: ""
    }
  }
  render(){
    const {delegates, present, setPresent, removeDelegate, addDelegate} = this.props;
    delegates.sort();
    
    return (
    <div>
      <table className="table content">
        <thead>
          <tr>
            <th>Delegation</th>
            <th>Present</th>
            <th>Present and Voting</th>
          </tr>
        </thead>
      </table>
      
      <div className="table-container">
        <table className="table content">
        
          <tbody>
          {
            delegates.map((name) => {
              const presentStatus = present[name];
              
              const getStatus = (status) => {
                if(status === presentStatus)return "Absent";
                return status;
              }
              return <tr key={name}>
                <td
                className="hover-red"
                onClick={
                  () => {
                    if(confirm(`Remove ${name}?`))removeDelegate(name);
                  }
                }
                >{name}</td>
                <td 
                onClick={
                  () => setPresent(name, getStatus("PRESENT"))
                }
                className={
                  classNames({
                    "toggled": presentStatus === "PRESENT" || presentStatus === "PRESENT_VOTING"
                  })
                }></td>
                <td 
                onClick={
                  () => setPresent(name, getStatus("PRESENT_VOTING"))
                }            
                className={
                  classNames({
                    "toggled": presentStatus === "PRESENT_VOTING"
                  })
                }></td>
              </tr>
            })
          }
          </tbody>
        </table>
      </div>
      <TextField
        label="Add Delegate"
        placeholder="Name"
        value={this.state.inputVal}
        onKeyPress={
          (e) => {
            if(e.key === "Enter"){
              const name = e.target.value;
              if(delegates.indexOf(name) === -1){
                addDelegate(name);              
              }else{
                alert(`${name} is already a delegate!`);
              }
              this.setState({inputVal: ""});
            }
          }
        }
        onChange={
          (e) => this.setState({inputVal: e.target.value})
        }
      />
    </div>);
  }
}

const RollCallConnector = connect(
  (state) => ({
    delegates: state.currState.delegates,
    present: state.currState.present
  }),
  (dispatch) => ({
    setPresent: (name, status) => dispatch(setPresent(name, status)),
    removeDelegate: (name) => dispatch(removeDelegate(name)),
    addDelegate: (name) => dispatch(addDelegate(name))
  })
)(RollCall);

export default RollCallConnector;
