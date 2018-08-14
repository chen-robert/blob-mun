import React, {Component} from "react";

import classNames from "classnames";
import {connect} from "react-redux";

import {Card, CardContent} from "@material-ui/core";

import {updateItem} from "client/actions";


class DraggableListItem extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const {item, updateItem, dragHandle} = this.props;
    return <Card className="draglist-item">
      {dragHandle(
      <div
      onClick={
        (e) => updateItem(item, null)
      }
      >
        <span 
        onClick={
          (e) => {
            e.stopPropagation()
          }
        }
        className="text">
        {item.name}
        </span>
        <span className="close-button"/>
      </div>
      )}
    </Card>
  }
}

const DraggableListItemConnector = connect(
  (state) => ({}),
  (dispatch) => ({
    updateItem: (item, delta) => dispatch(updateItem(item, delta))
  })
)(DraggableListItem);


export default DraggableListItemConnector;