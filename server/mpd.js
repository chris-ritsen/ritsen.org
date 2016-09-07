
const { startsWith, throttle } = require("lodash");

const media_player = "/home/chris/.scripts/py/media_player";
const spawn = throttle(require("child_process").spawn, 80);

const checkOutput = (script, args) => {
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
    "current",
    "-f",
    "%file%"
  ]);
};

const handlers = {
  post: {
    sink: (request, response, next) => {
      let sink = request.body.sink;

      checkOutput("pactl", [
        "list",
        "short",
        "sink-inputs"
      ]).then((lines) => {
        let sink_input;

        lines.split("\n").forEach((line) => {
          lines.split("\t").forEach((arg) => {
            if (sink_input) {
              return;
            }

            sink_input = arg[0];
          });
        });

        return sink_input;
      }).then((sink_input) => {

        // TODO: This is making an assumption about the stream.

        spawn("pactl", [
          "move-sink-input",
          sink_input,
          sink
        ]);

        response.send();
      });
    },
    pause: (request, response, next) => {
      let pause = request.body.pause;
      let port = request.body.port || 6600;

      spawn("mpc", [
        (pause) ? "pause" : "play",
        "--port",
        port
      ]);

      response.send();
    }
  },
  get: {
    current: (request, response, next) => {
      getCurrent().then((current) => {
        response.json({ current });
      });
    }
  }
};

const routes = (() => {
  const bodyParser = require("body-parser");
  const express = require("express");

  const app = express();

  app.use(bodyParser.json());

  app.get("/current", handlers.get.current);
  app.post("/pause", handlers.post.pause);
  app.post("/sink", handlers.post.sink);

  return app;
})();

module.exports = {
  routes
};

