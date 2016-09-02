
const Socket = require("socket.io");
const express = require("express");
const resolve = require("path").resolve;

const app = new express();
const port = process.env.PORT || 3000;

const router = express.Router();

const mpv = require("./mpv");

app.use("/mpv", mpv.routes);

router.use("/static", express.static(resolve(__dirname, "../static")));
router.get("/main.css", (request, response) => response.sendFile(resolve(__dirname, "../common/main.css")));
router.get("/*", (request, response) => response.sendFile(resolve(__dirname, "../common/index.html")));

app.use(router);

const errorHandler = (error) => {
  if (error) {
    console.error(error);
  }
};

const host = "0.0.0.0";
let connections = 0;
let watchProps;

const io = Socket(app.listen(port, host, errorHandler));

io.sockets.on("connection", (socket) => {
  let timeNow;
  let pathNow;

  console.log("connected");
});

