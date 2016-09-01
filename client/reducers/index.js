
let doPost = (url, body) => {
  fetch(url, {
    "body": JSON.stringify(body),
    "headers": new Headers({
      "Content-Type": "application/json"
    }),
    "method": ("POST")
  });
};

const index = (state = {
  "playlist": [],
  "volume": null
}, action) => {
  let newState;

  switch (action.type) {
  case "MPV_VOLUME":
      newState = Object.assign({}, state);
      newState["volume"] = action.volume;
      return newState;
  case "MPV_PLAYLIST":
      newState = Object.assign({}, state);
      newState["playlist"] = action.playlist;
      return newState;
  case "MPV_PAUSE":
      doPost("/mpv/pause", {
        "pause": true
      });

      return state;
  case "MPV_UNPAUSE":
      doPost("/mpv/pause", {
        "pause": false
      });

      return state;
  default:
    return state;
  }
};

export default index;

