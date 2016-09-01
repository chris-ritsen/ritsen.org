
import React, { PropTypes } from "react";
import { Provider } from "react-redux";
import { browserHistory, Router, Route } from "react-router";
import MediaPlayer from "../components/mediaPlayer";
import HomePage from "../components/homePage";
import Article from "../components/article";

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={HomePage} />
      <Route path="/article/:year/:month/:day/:slug" component={Article} />
      <Route path="/media_player" component={MediaPlayer} />
    </Router>
  </Provider>
);

Root.propTypes = {
  "store": PropTypes.object.isRequired
}

export default Root;

