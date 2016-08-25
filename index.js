
import * as actions from "./actions/index";
import React from "react";
import Root from "./components/root";
import link from "./reducers/link";
import persistState from "redux-localstorage";
import { createStore } from "redux";
import { render } from "react-dom";

const rootEl = document.getElementById("root");
const store = createStore(link, persistState());

console.log(store.getState());

render(<Root store={store} />, rootEl);

