
import * as actions from "../actions/index";
import React from "react";
import { connect } from "react-redux";

let TitleEditor = ({ dispatch, value, editing }) => {
  let input;
  let template;

  const onBlur = () => {
    dispatch(actions.editLink(value, input.value));
  };

  const checkEnter = (event) => {
    if (event.keyCode === 13) {
      dispatch(actions.editLink(value, input.value));
    }
  };

  if (editing) {
    template = (
      <input
      defaultValue={value}
      onBlur={onBlur}
      onKeyUp={checkEnter}
      placeholder={value}
      ref={ node => { input = node }}
      type="text" />
    );
  } else {
    template = (<span>{value}</span>);
  }

  return template;
};

TitleEditor = connect((state, props) => {
  return {
    "editing": props.editing,
    "value": props.value
  }
})(TitleEditor);

export default TitleEditor;

