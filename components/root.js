
import React from "react";
import { browserHistory, Router, Route } from "react-router";

import App from "./app";

const Root = (
  <Router history={browserHistory}>
    <Route path="/(:path)" component={App} />
  </Router>
);

export default Root;

