
import bodyParser from "body-parser";
import express from "express";
import { throttle } from "lodash";

import { spawn } from "child_process";

const media_player = "/home/chris/.scripts/py/media_player";
const spawnSlow = throttle(spawn, 80);

const files = {
  "movies": "/Media/Videos/Movies",
  "tv": "/Media/Videos/TV"
};

const checkOutput = (script, args) => {
  let child = spawnSlow(script, args);

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

const getFiles = (path) => {
  return checkOutput("find", [
    path,
    "-type",
    "f"
  ]).then((lines) => lines.split("\n"));
};

const handlers = {
  "post": {
    "prop": (request, response, next) => {
      const propName = request.params.prop;
      let propValue = request.body[propName];

      if (propValue === true || propValue === false) {
        propValue = propValue ? "yes" : "no"
      }

      spawnSlow(media_player, [
        "--prop",
        `${propName}=${propValue}`
      ]);

      response.json({
        [propName]: request.body[propName]
      });
    }
  },
  "get": {
    "prop": (request, response, next) => {
      const propName = request.params.prop;

      const getProp = (prop) => {
        return checkOutput(media_player, [
          "--json",
          "--prop",
          prop
        ]);
      };

      getProp(propName).then((prop) => {
        response.json({ [propName]: prop });
      });
    },
    "movies": (request, response, next) => {
      getFiles(files.movies).then((movies) => {
        response.json({ movies });
      });
    },
    "tv": (request, response, next) => {
      getFiles(files.tv).then((tv) => {
        response.json({ tv });
      });
    }
  }
};

const routes = (() => {
  const app = express();

  app.use(bodyParser.json());

  app.get("/movies", handlers.get.movies);
  app.get("/tv", handlers.get.tv);

  app.get("/:prop", handlers.get.prop);
  app.post("/:prop", handlers.post.prop);

  return app;
})();

module.exports = {
  routes
};

