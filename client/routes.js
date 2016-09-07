
import Article from "../client/components/article";
import AudioPlayer from "../client/containers/audioPlayer";
import HomePage from "../client/components/homePage";
import MediaPlayer from "../client/containers/mediaPlayer";
import React from "react";
import { Provider } from "react-redux";
import { createRoutes, Router, Route } from "react-router";

const routes = (
  <Router>
    <Route path="/" component={HomePage} />
    <Route path="/article/:year/:month/:day/:slug" component={Article} />
    <Route path="/media_player" component={MediaPlayer} />
    <Route path="/audio_player" component={AudioPlayer} />
  </Router>
);

export default createRoutes(routes);

