import React, { Component } from "react";

import { Card } from "@material-ui/core";

class DraggableListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { item, dragHandle, commonProps } = this.props;
    const { updateItem } = commonProps;

    return (
      <Card className="draglist-item">
        {dragHandle(
          <div onClick={() => updateItem(item, null)}>
            <span
              onClick={e => {
                e.stopPropagation();
              }}
              className="text"
            >
              {item.name}
            </span>
            <span className="close-button" />
          </div>
        )}
      </Card>
    );
  }
}

export default DraggableListItem;
