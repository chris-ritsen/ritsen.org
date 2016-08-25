
import * as actions from "../actions/index";
import React from "react";
import { connect } from "react-redux";

let LandingPage = ({ dispatch, link, linkText }) => {
  dispatch(actions.incrementCounter(link));

  const style = {
    "textAlign": "center"
  };

  return (
    <div style={style}>
      <h1>{linkText} are awesome!</h1>
      <h1>Come join Tim's World Wide Web!</h1>
    </div>
  );
};

const mapState = (props, ownProps) => {
  let capitalise = (text) => {
    return text.slice(0, 1).toUpperCase() + text.slice(1, text.length);
  };

  let link = ownProps.link;
  let linkText = capitalise(link);

  return {
    link,
    linkText
  };
};

LandingPage = connect(mapState)(LandingPage);

export default LandingPage;

