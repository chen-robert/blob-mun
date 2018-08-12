import React from "react";

import classNames from "classnames";

import Header from "./HeaderConnector";
import Buttons from "./ButtonConnector";

const App = ({collapsed}) => {
  return <div>
    <div id="main-content" className={
        classNames({
          "collapsed": collapsed
        })
      }>
      <Header />
    </div>
    <Buttons />
  
  </div>;
}

export default App;