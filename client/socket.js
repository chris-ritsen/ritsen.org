
import * as io from "socket.io-client";

let uri = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

let socket = io.connect(uri, {
  "reconnection": true,
  "reconnectionAttempts": 10,
  "reconnectionDelay": 500
});

export default socket;

