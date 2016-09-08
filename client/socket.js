
import * as io from "socket.io-client";

let socket;

export default () => {
  if (typeof window === "undefined") {
    return;
  }

  let uri = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

  if (!socket || socket.disconnected) {
    socket = io.connect(uri, {
      "reconnection": true,
      "reconnectionAttempts": 10,
      "reconnectionDelay": 1000
    });
  }

  return socket;
};

