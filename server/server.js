
const Socket = require("socket.io");
const express = require("express");
const path_resolve = require("path").resolve;
const systemd = require("systemd");

import React from "react";
import { createRoutes, match, RouterContext } from "react-router";
import { renderToString } from "react-dom/server";
import Root from "../client/containers/root";

const app = new express();

const port = (
(process.env.LISTEN_PID > 0) ? "systemd" :
process.env.PORT ||
8092
);

// TODO: React server-side rendering.

import webpack from 'webpack'
// import webpackDevMiddleware from 'webpack-dev-middleware'
// import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'
import routes from "../client/routes";

import { StyleRoot} from "radium";
import { Provider } from "react-redux";

import reducer from "../client/reducers/index";
import { createStore } from "redux";

// const compiler = webpack(webpackConfig)
// app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
// app.use(webpackHotMiddleware(compiler))

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
  match({ routes: createRoutes(routes), location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const store = createStore(reducer);

      const html = renderToString(

      <Provider store={store}>
      <StyleRoot className="loading" id="style-root"><RouterContext {...renderProps} /></StyleRoot>
      </Provider>
      );

      res.status(200).send(renderFullPage(html));
    } else {
      res.status(404).send("Not found")
    }
  });

};

const router = express.Router();

const mpd = require("./mpd");
const mpv = require("./mpv");

app.use("/mpv", mpv.routes);
app.use("/mpd", mpd.routes);

// TODO: Move all router stuff out of here.

router.use("/static", express.static(path_resolve(__dirname, "../static")));
router.get("/main.css", (request, response) => response.sendFile(path_resolve(__dirname, "../common/main.css")));
// router.get("/*", (request, response) => response.sendFile(path_resolve(__dirname, "../common/index.html")));

app.use(router);
app.use(handleRender)

const errorHandler = (error) => {
  if (error) {
    console.error(error);
  }
};

const host = "0.0.0.0";

let connections = 0;
let watchProps;
const io = Socket(app.listen(port, host, errorHandler));

let watchingMpd = false;

// TODO: Where should the socket code live?

const checkOutput = (script, args) => {
  const spawn = require("child_process").spawn;
  let child = spawn(script, args);

  let promise = new Promise((resolve, reject) => {
    let buffer = "";

    child.stdout.on("data", (data) => {
      buffer += data;
    });

    child.on("exit", () => {
      let response = buffer.toString("utf8").trim();

      resolve(response);
    });
  });

  return promise;
};

const getCurrent = () => {
  return checkOutput("mpc", [
    "-f",
    "[[%artist% - ]%title%]|[%file%]"
  ]).then((lines) => {
    let arr = lines.split("\n");

    return {
      "current": arr[0],
      "paused": !!~arr[1].indexOf("[paused]")
    };
  });
};

io.sockets.on("connection", (socket) => {
  let timeNow;
  let pathNow;

  console.log("connected");
  const { throttle } = require("lodash");

  const spawn = require("child_process").spawn;

  const checkOutputForever = (script, args) => {
    let child = spawn(script, args);

    child.stdout.on("data", (data) => {
      let messages = data.toString("utf8").trim().split("\n");

      messages.forEach((message) => {
        io.emit("mpd", { message });

        if (message === "player") {
          getCurrent().then(({current, paused}) => {
            io.emit("mpd", { current, paused });
          });
        }
      })
    });
  };

  const getCurrentForever = () => {
    checkOutputForever("mpc", [
      "idleloop"
    ]);
  };

  if (!watchingMpd) {
    getCurrentForever();
    watchingMpd = true;
  }
});

