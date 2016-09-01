
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
      fetch("/mpv/pause", {
        "body": JSON.stringify({
          "pause": true
        }),
        "headers": new Headers({
          "Content-Type": "application/json"
        }),
        "method": ("POST")
      })
      return state;
  case "MPV_UNPAUSE":
      fetch("/mpv/pause", {
        "body": JSON.stringify({
          "pause": false
        }),
        "headers": new Headers({
          "Content-Type": "application/json"
        }),
        "method": ("POST")
      })
      return state;
  case "EDIT_LINK":
    if (action.oldTitle === action.newTitle) {
      newState = Object.assign({}, state);
      newState[action.newTitle].editing = false;
      return newState;
    }

    newState = Object.assign({}, state);
    newState[action.newTitle] = state[action.oldTitle];
    newState[action.newTitle].editing = false;

    delete newState[action.oldTitle];
    return newState;
  case "REMOVE_LINK":
    newState = Object.assign({}, state);

    delete newState[action.title];
    return newState;
  case "START_EDITING":
    if (!action.title || !state[action.title]) {
      return state;
    }

    newState = Object.assign({}, state, {
      [action.title]: {
        "editing": true,
        "hits": state[action.title].hits
      }
    });

    return Object.assign({}, state, newState);
  case "ADD_LINK":
    if (!action.title || state[action.title]) {
      return state;
    }

    return Object.assign({}, state, {
      [action.title]: {
        "editing": false,
        "hits": 0
      }
    });
  case "INCREMENT_COUNTER":
    if (state[action.title] === undefined) {
      return state;
    }

    return Object.assign({}, state, {
      [action.title]: {
        "hits": state[action.title].hits + 1
      }
    });
  default:
    return state;
  }
};

export default index;

