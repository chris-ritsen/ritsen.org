
import * as actions from "../actions/index";
import React, { Component } from "react";
import { connect } from "react-redux";

let Playlist = ({ dispatch, state }) => {
  let files;

  const listStyle = {
    "listStyleType": "none",
    "padding": 0
  };

  if (state && Array.isArray(state.playlist)) {
    files = Object.keys(state.playlist).map((prop, index) => {
      let style = {
      };

      if (state.playlist[index].current) {
        style.fontWeight = "bold";
      }

      return (
        <li style={style} key={index}>{state.playlist[index].filename}</li>
      );
    });

  }

  return <ul style={listStyle}>
  {files}
  </ul>
};

Playlist = connect()(Playlist);

export default Playlist;

