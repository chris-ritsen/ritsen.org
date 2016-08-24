
import App from "./app";
import React, { PropTypes } from "react";
import { Provider } from "react-redux";
import { browserHistory, Router, Route } from "react-router";

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/(:path)" component={App} />
    </Router>
  </Provider>
);

Root.propTypes = {
  "store": PropTypes.object.isRequired
}

export default Root;

