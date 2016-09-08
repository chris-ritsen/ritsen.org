
import React from "react";
import Root from "../client/containers/root";
import reducer from "../client/reducers/index";
import routes from "../common/routes";
import { Provider } from "react-redux";
import { StyleRoot} from "radium";
import { createRoutes, match, RouterContext } from "react-router";
import { createStore } from "redux";
import { renderToStaticMarkup, renderToString } from "react-dom/server";

const renderFullPage = (html, preloadedState) => {
  return `
<!doctype html>
<html>
  <head>
    <title></title>
  </head>
<style>
</style>
<meta
content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no"
name="viewport" />
<link href="/main.css" rel="stylesheet" />
  <body>
    <div id="root">${html}</div>
    <script src="/static/bundle.js"></script>
  </body>
</html>
`
};

const handleRender = (req, res) => {
  match({
    "routes": createRoutes(routes),
    "location": req.url
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const store = createStore(reducer);

      const html = renderFullPage(renderToStaticMarkup(
        <Provider store={store}>
          <StyleRoot
          className="loading"
          id="style-root">
            <RouterContext {...renderProps} />
          </StyleRoot>
        </Provider>
      ));

      res.status(200).send(html);
    } else {
      res.status(404).send("Not found")
    }
  });

};

module.exports = {
  renderFullPage,
  handleRender
};

