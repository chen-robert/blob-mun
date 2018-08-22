import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import App from "./containers/App.js";
import ServerUpdater from "./ServerUpdater";
import reducer from "./reducers";
import "./styles/main.less";
import "./styles/login.less";
import "typeface-roboto";

import incrementTimer from "client/actions";

const store = createStore(reducer);
 
const render = () => ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById("app"));

render();
store.subscribe(render);

setInterval(() => ServerUpdater.updateServer(store.getState()), 10 * 1000);

//Load until we get a valid result
const loadInterval = setInterval(() => ServerUpdater.loadData((err, data) => {
  if(err)return;
  
  if(data.data){
    store.dispatch({
      type: "LOAD_SERVER_STATE",
      data: data.data
    });
  }
  clearInterval(loadInterval);
}), 1000);