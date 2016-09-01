
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

const volume = (newVolume) => (
  fetch("/mpv/volume", {
    "body": (newVolume ? JSON.stringify({
      "volume": newVolume
    }) : undefined),
    "headers": new Headers({
      "Content-Type": "application/json"
    }),
    "method": (newVolume ? "POST" : "GET")
  })
  .then(response => response.json())
  .then((prop) => ({
    "type": "MPV_VOLUME",
    "volume": prop.volume
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
  unpause,
  volume
};

