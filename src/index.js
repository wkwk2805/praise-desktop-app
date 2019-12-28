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
import PublicPath from "./utility/PublicPath";
const store = createStore(rootReducer);
const path = `${PublicPath}/ppt/`; //경로 맞추어줌

if (fs.existsSync(path)) {
  let is$ = false;
  fs.readdirSync(path).forEach(file => {
    if (file.indexOf("$") !== -1) {
      is$ = true;
    }
  });
  if (!is$) {
    fs.readdirSync(path).forEach(file => {
      let curPath = path + file;
      fs.unlinkSync(curPath);
    });
  }
}

// index.html 에 작성한 ID 값
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
