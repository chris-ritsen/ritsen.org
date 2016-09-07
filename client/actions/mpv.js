
const pause = () => ({
  "type": "MPV_PAUSE"
});

const unpause = () => ({
  "type": "MPV_UNPAUSE"
});

const gotPlaylist = (playlist) => {
  return {
    "type": "MPV_PLAYLIST",
    playlist
  };
};

const seek = (timePos) => {
  fetch("/mpv/time-pos", {
    "body": JSON.stringify({
      "time-pos": timePos
    }),
    "headers": new Headers({
      "Content-Type": "application/json"
    }),
    "method": ("POST")
  });

  return {
    "type": "MPV_SEEK"
  };
};

const setProp = (propName, propValue) => (
  // TODO: Convert string, given types of properties

  fetch(`/mpv/${propName}`, {
    "body": (propValue || propValue === 0 ? JSON.stringify({
      [propName]: propValue
    }) : undefined),
    "headers": new Headers({
      "Content-Type": "application/json"
    }),
    "method": ("POST")
  })
  .then(response => response.json())
  .then((prop) => ({
    "type": "MPV_PROP",
    prop: {
      [propName]: prop[propName]
    }
  }))
);

const playlist = () => (
  fetch("/mpv/playlist")
  .then(response => response.json())
  .then(prop => gotPlaylist(prop))
);

export {
  pause,
  playlist,
  seek,
  setProp,
  unpause
};

