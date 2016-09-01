
import React from "react";
import { Link, withRouter } from "react-router";

import MediaPlayer from "../components/mediaPlayer";

const style = {
  "backgroundColor": "black",
  "display": "flex",
  "flexGrow": "1"
};

const HomePage = () => (
  <div>
    <h1>Home</h1>
    <Link to={"/media_player"}>Media Player</Link>
  </div>
);

const App = withRouter(({ params, location }) => {
  let template;

  let getSection = (path) => {
    switch (params.path) {
    case "media_player":
      return (<MediaPlayer />);
    default:
      return (<HomePage />);
    }
  }

  let section = getSection(params.path);

  template = (
    <main style={style}>
    {section}
    </main>
  );

  // console.log(params, location);

  return template;
});

export default App;

