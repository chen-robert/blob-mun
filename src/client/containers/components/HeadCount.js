import React from "react";

const HeadCount = ({count}) => {
  return (
  <div>
    <span>
      <span className="pie-text">{count}</span>
      <span className="pie full"/>
    </span>
    <span>
      <span className="pie-text">{Math.floor(count * 2 / 3)}</span>
      <span className="pie twothirds"/>
    </span>
    <span>
      <span className="pie-text">{Math.floor(count / 2)}</span>
      <span className="pie half"/>
    </span>
  </div>
  )
}

export default HeadCount;