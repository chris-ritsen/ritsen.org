
import { spawn } from "child_process";
import { startsWith, throttle } from "lodash";

const spawnSlow = throttle(spawn, 80);
let watchingMpd = false;

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
    "-f",
    "[[%artist% - ]%title%]|[%file%]"
  ]).then((lines) => {
    let arr = lines.split("\n");
    const paused = !!~arr[1].indexOf("[paused]")
    const current = arr[0]

    return {
      current,
      paused
    };
  }, (error) => { console.log(error); });
};

const checkOutputForever = function (script, args) {
  let child = spawn(script, args);

  child.stdout.on("data", (data) => {
    let messages = data.toString("utf8").trim().split("\n");

    messages.forEach((message) => {
      this.emit("mpd", { message });
    })

    getCurrent().then(({current, paused}) => {
      this.emit("mpd", { current, paused });
    });
  });
};

const socket_connected = function (socket) {
  let timeNow;
  let pathNow;

  if (!watchingMpd) {
    checkOutputForever.call(this, "mpc", [
      "idleloop"
    ]);
    watchingMpd = true;
  }
};

const handlers = {
  "post": {
    "next": (request, response, next) => {
      spawnSlow("mpc", [
        "next"
      ]);
      response.status(200).send();
    },
    "previous": (request, response, next) => {
      spawnSlow("mpc", [
        "prev"
      ]);
      response.status(200).send();
    },
    "sink": (request, response, next) => {
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

        spawnSlow("pactl", [
          "move-sink-input",
          sink_input,
          sink
        ]);

        response.send();
      });
    },
    "pause": (request, response, next) => {
      let pause = request.body.pause;
      let port = request.body.port || 6600;

      spawnSlow("mpc", [
        (pause) ? "pause" : "play",
        "--port",
        port
      ]);

      response.send();
    }
  },
  "get": {
    "current": (request, response, next) => {
      getCurrent().then(({ current, paused }) => {
        response.json({ current, paused });
      }, (error) => {
        response.status(500).send("error");
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
  app.post("/next", handlers.post.next);
  app.post("/pause", handlers.post.pause);
  app.post("/previous", handlers.post.previous);
  app.post("/sink", handlers.post.sink);

  return app;
})();


const sockets = [
  {
    "connection": socket_connected
  }
];


module.exports = {
  routes,
  sockets
};

