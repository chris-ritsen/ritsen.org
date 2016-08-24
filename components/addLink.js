
import React from "react";
import * as actions from "../actions/index";
import { connect } from "react-redux";

const AddLink = connect()(({ dispatch }) => {
  let input;

  const onClick = () => {
    let title = input.value;

    input.value = "";
    dispatch(actions.addLink(title));
  };

  const checkEnter = (event) => {
    if (event.keyCode === 13) {
      onClick();
    }
  };

  return (
    <div>
      <span>Add a link:</span>
      <input onKeyUp={checkEnter} ref={ node => { input = node }} type="text" placeholder="Enter a title…" />
      <button onClick={onClick} name="add">Add</button>
    </div>
  );
});

export default AddLink;

