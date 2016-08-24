
import * as actions from "./actions/index";
import React from "react";
import Root from "./components/root";
import link from "./reducers/link";
import { createStore } from "redux";
import { render } from "react-dom";

const store = createStore(link);

store.dispatch(actions.addLink("example"));
store.dispatch(actions.incrementCounter("example"));

const rootEl = document.getElementById("root");

render(<Root store={store} />, rootEl);

