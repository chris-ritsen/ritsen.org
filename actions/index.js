
const addLink = (title) => ({
  "type": "ADD_LINK",
  title
});

const editLink = (oldTitle, newTitle) => ({
  "type": "EDIT_LINK",
  newTitle,
  oldTitle
});

const removeLink = (title) => ({
  "type": "REMOVE_LINK",
  title
});

const startEditing = (title) => ({
  "type": "START_EDITING",
  title
});

const incrementCounter = (title) => ({
  "type": "INCREMENT_COUNTER",
  title
});

export {
  addLink,
  editLink,
  incrementCounter,
  removeLink,
  startEditing
};

