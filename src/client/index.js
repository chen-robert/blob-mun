import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import { Provider } from 'react-redux'

import App from "./containers/App.js";

import reducer from "./reducers";

const store = createStore(reducer);
 
const render = () => ReactDOM.render(
  <Provider store={store}>
    <div>HI</div>
  </Provider>,
  document.getElementById("app"));

render();
store.subscribe(render);