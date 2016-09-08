
import Article from "../components/article";
import AudioPlayer from "../containers/audioPlayer";
import HomePage from "../components/homePage";
import MediaPlayer from "../containers/mediaPlayer";
import React, { PropTypes } from "react";
import { Provider } from "react-redux";
import { StyleRoot} from "radium";
import { browserHistory, Router, Route } from "react-router";

import routes from "../../common/routes";

// import { match, Router } from "react-router";
// import routes from "./routes";

// match({ history, routes }, (error, redirectLocation, renderProps) => {
//   render(<Router {...renderProps} />, rootEl)
// })

const Root = ({ store }) => (
  <Provider store={store}>
    <StyleRoot id="style-root">
    {routes}
    </StyleRoot>
  </Provider>
);

Root.propTypes = {
  "store": PropTypes.object.isRequired
}

export default Root;

