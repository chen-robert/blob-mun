import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import { Provider } from 'react-redux'

import App from "./containers/App.js";

import reducer from "./reducers";

import "./styles/main.less";
import "./styles/session.less";

const store = createStore(reducer);
 
const render = () => ReactDOM.render(
  <Provider store={store}>
    <App collapsed={store.getState().collapsed}
      currSession={store.getState().sessionName}
    />
  </Provider>,
  document.getElementById("app"));

render();
store.subscribe(render);