
import * as actions from "../actions/index";
import React from "react";
import TitleEditor from "./titleEditor";
import { connect } from "react-redux";

let AddLink = ({ dispatch }) => {
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

  const style = {
    "base": {
      "alignItems": "baseline",
      "display": "flex",
      "justifyContent": "center"
    },
    "addButton": {
      "marginLeft": "1ex"
    },
    "addLink": {
      "marginRight": "1ex"
    }
  };

  return (
    <div style={style.base}>
      <span style={style.addLink}>Add a link:</span>
      {" "}
      <input onKeyUp={checkEnter} ref={ node => { input = node }} type="text" placeholder="Enter a title…" />
      {" "}
      <button style={style.addButton} onClick={onClick} name="add">Add</button>
    </div>
  );
};

AddLink = connect()(AddLink);

export default AddLink;

