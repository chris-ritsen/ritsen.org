
import "whatwg-fetch";
import * as actions from "./actions/index";
import promise from "redux-promise";
import React from "react";
import Root from "./containers/root";
import reducer from "./reducers/index";
import persistState from "redux-localstorage";
import { applyMiddleware, createStore } from "redux";
import { render } from "react-dom";

const rootEl = document.getElementById("root");
const store = createStore(reducer, persistState(), applyMiddleware(promise));

render(<Root store={store} />, rootEl);

