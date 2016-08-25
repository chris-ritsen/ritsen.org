
import * as actions from "../actions/index";
import React from "react";
import { Link, makeHref } from "react-router";
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
    const onClick = (event) => {
      event.preventDefault();
      window.open("/landing?link=" + value);
    };

    const style = {
      "color": "initial",
      "textDecoration": "none"
    };

    template = (
      <Link
      onClick={onClick}
      style={style}
      target="_blank"
      to="/"
      >{value}</Link>
    );
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

