
const spawn = require("child_process").spawn;

const getProp = (propName) => {
  const media_player = spawn("/home/chris/.scripts/py/media_player", [
    "--json",
    "--prop",
    propName
  ]);

  let propPromise = new Promise((resolve, reject) => {
    media_player.stdout.on("data", (data) => {
      let responseText;

      try {
        responseText = JSON.parse(data.toString("utf8"));
      } catch (ex) {
        console.log(ex);
      }

      resolve(responseText);
    });
  });

  return propPromise;
};

const routes = (() => {
  const bodyParser = require("body-parser");
  const express = require("express");

  const app = express();

  app.use(bodyParser.json());

  app.post("/:prop", (request, response, next) => {
    const propName = request.params.prop;
    let propValue = request.body[propName];

    if (propValue === true || propValue === false) {
      propValue = propValue ? "yes" : "no"
    }

    // TODO: Send boolean values as yes/no.

    const media_player = spawn("/home/chris/.scripts/py/media_player", [
      "--prop",
      `${propName}=${propValue}`
    ]);

    response.json({
      [propName]: request.body[propName]
    });
  });

  app.get("/:prop", (request, response, next) => {
    const propName = request.params.prop;

    getProp(propName).then((prop) => {
      response.json({
        [propName]: prop
      });
    });
  });

  return app;
})();

module.exports = {
  getProp,
  routes
};

