
import { routes, sockets } from "./configure";
import express from "express";
import systemd from "systemd";

const app = new express();
const host = "0.0.0.0";

const port = (process.env.LISTEN_PID > 0) ? "systemd" :
  (process.env.PORT || 8092);

const errorHandler = (error) => {
  if (error) {
    console.error(error);
  }
};

routes(app);

const server = app.listen(port, host, errorHandler);

sockets(server);

