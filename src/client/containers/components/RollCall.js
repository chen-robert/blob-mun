import React, {Component} from "react";

import classNames from "classnames";
import {withRouter} from "react-router";
import {connect} from "react-redux";

import {TextField, FormGroup, FormControlLabel, Switch, Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import {setPresent, removeDelegate, addDelegate} from "client/actions";

class RollCall extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      inputVal: "",
      validate: true
    }
  }
  render(){
    const {delegates, present, setPresent, removeDelegate, addDelegate} = this.props;
    
    const addDelegateWrapper = () => {      
      const name = this.state.inputVal.trim();
      if(delegates.indexOf(name) === -1){
        addDelegate(name);              
      }else{
        alert(`${name} is already a delegate!`);
      }
      this.setState({inputVal: ""});
    }
    
    return (
    <div>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.validate}
              onChange={(e) => this.setState({validate: e.target.checked})}
            />
          }
          label="Warn on remove user"
        />
      </FormGroup>
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
                    if(!this.state.validate || confirm(`Remove ${name}?`))removeDelegate(name);
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
              addDelegateWrapper();
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

const RollCallConnector = withRouter(connect(
  (state, ownProps) => ({
    delegates: state.allStates[ownProps.match.params.id].delegates,
    present: state.allStates[ownProps.match.params.id].present
  }),
  (dispatch, ownProps) => ({
    setPresent: (name, status) => dispatch(setPresent(name, status, ownProps.match.params.id)),
    removeDelegate: (name) => dispatch(removeDelegate(name, ownProps.match.params.id)),
    addDelegate: (name) => dispatch(addDelegate(name, ownProps.match.params.id))
  })
)(RollCall));

export default RollCallConnector;
