
import "whatwg-fetch";
import * as actions from "./actions/index";
import React from "react";
import Root from "./containers/root";
import persistState from "redux-localstorage";
import promise from "redux-promise";
import reducer from "./reducers/index";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { render } from "react-dom";

import css from "../common/main.css"

const rootEl = document.getElementById("root");
const store = createStore(reducer, persistState(), applyMiddleware(
  promise,
  thunk
));

render(<Root store={store} />, rootEl);

