
const pause = () => {
  setPause(true);

  return {
    "type": "MPD_PAUSE"
  }
};

const unpause = () => {
  setPause(false);

  return {
    "type": "MPD_UNPAUSE"
  };
};

const sink = (target) => {
  fetch(`/mpd/sink`, {
    "body": JSON.stringify({
      sink: target
    }),
    "headers": new Headers({
      "Content-Type": "application/json"
    }),
    "method": ("POST")
  });

  return {
    "type": "PA_MOVE_STREAM"
  };
};

const setPause = (value) => (
  fetch(`/mpd/pause`, {
    "body": JSON.stringify({
      pause: value
    }),
    "headers": new Headers({
      "Content-Type": "application/json"
    }),
    "method": ("POST")
  })
);

export {
  pause,
  sink,
  unpause
};

