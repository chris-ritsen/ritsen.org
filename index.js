
import React from "react";
import Root from "./components/root";
import { createStore } from "redux";
import { render } from "react-dom";

const store = createStore((state = {}, action) => {
  switch (action.type) {
  case "ADD_LINK":
    return Object.assign({}, state, {
      [action.title]: 0
    });
  case "INCREMENT_COUNTER":
    return Object.assign({}, state, {
      [action.link]: state[action.link] + 1
    });
  default:
    return state;
  }

});

console.log("Initial state:", store.getState());

store.dispatch({
  "title": "example",
  "type": "ADD_LINK"
});

console.log("Link added:", store.getState());

store.dispatch({
  "link": "example",
  "type": "INCREMENT_COUNTER"
});

console.log("Link counter incremented:", store.getState());

const rootEl = document.getElementById("root");

render(<Root store={store} />, rootEl);

