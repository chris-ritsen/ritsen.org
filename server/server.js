
import Socket from "socket.io";
import express from "express";
import mpd from "./mpd";
import mpv from "./mpv";
import path from "path";
import systemd from "systemd";
import { renderFullPage, handleRender } from "./render";
import { spawn } from "child_process";
import { throttle } from "lodash";

const app = new express();
const host = "0.0.0.0";

const port = (process.env.LISTEN_PID > 0) ? "systemd" :
  (process.env.PORT || 8092);

const errorHandler = (error) => {
  if (error) {
    console.error(error);
  }
};

const io = Socket(app.listen(port, host, errorHandler));

const router = express.Router();

app.use("/mpv", mpv.routes);
app.use("/mpd", mpd.routes);

router.use("/static", express.static(path.resolve(__dirname, "../static")));
router.get("/main.css", (request, response) => response.sendFile(path.resolve(__dirname, "../common/main.css")));

app.use(router);
app.use(handleRender)

io.sockets.on("connection", mpd.socket_connected.bind(io));

