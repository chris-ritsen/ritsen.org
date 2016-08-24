
const link = (state = {}, action) => {
  switch (action.type) {
  case "ADD_LINK":
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

