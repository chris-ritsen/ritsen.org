
const link = (state = {}, action) => {
  let newState;

  switch (action.type) {
  case "EDIT_LINK":
    if (action.oldTitle === action.newTitle) {
      return state;
    }

    // TODO: What about overwriting existing entries?

    newState = Object.assign({}, state);
    newState[action.newTitle] = state[action.oldTitle];
    delete newState[action.oldTitle];
    return newState;
  case "REMOVE_LINK":
    newState = Object.assign({}, state);

    delete newState[action.title];
    return newState;
  case "ADD_LINK":
    if (state[action.title]) {
      return state;
    }

    return Object.assign({}, state, {
      [action.title]: 0
    });
  case "INCREMENT_COUNTER":
    return Object.assign({}, state, {
      [action.title]: state[action.title] + 1
    });
  default:
    return state;
  }
};

export default link;

