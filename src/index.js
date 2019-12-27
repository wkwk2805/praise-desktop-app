import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "semantic-ui-css/semantic.min.css";
import "./layout.css";
import "@babel/polyfill";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store/index";
import fs from "fs";
const store = createStore(rootReducer);

const path = `${process.cwd()}/ppt`;

if (fs.existsSync(path)) {
  fs.readdirSync(path).forEach(file => {
    var curPath = path + "/" + file;
    fs.unlinkSync(curPath);
  });
}

// index.html 에 작성한 ID 값
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
