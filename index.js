
import * as actions from "./actions/index";
import React from "react";
import Root from "./components/root";
import link from "./reducers/link";
import { createStore } from "redux";
import { render } from "react-dom";

const store = createStore(link);

console.log(actions);

console.log("Initial state:", store.getState());

store.dispatch(actions.addLink("example"));

console.log("Link added:", store.getState());

store.dispatch(actions.incrementCounter("example"));

console.log("Link counter incremented:", store.getState());

store.dispatch(actions.editLink("example", "foobar"));

console.log("Link counter incremented:", store.getState());

store.dispatch(actions.removeLink("foobar"));

console.log("Link counter removed:", store.getState());

const rootEl = document.getElementById("root");

render(<Root store={store} />, rootEl);

