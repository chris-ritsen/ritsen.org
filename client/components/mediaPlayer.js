
import * as actions from "../actions/index";
import React, { Component } from "react";
import SeekBar from "./seekBar";
import { connect } from "react-redux";
import { debounce } from "lodash";

import socket from "../socket";

class MediaPlayer extends Component {
  componentDidMount() {
    socket.on("message", (data) => {
      if (data["time-pos"] === null || data["length"] === null) {
        return;
      }

      this.setState(data);
    });
  }
  constructor(props, context) {
    super(props, context);

    this.state = {
      "length": 0,
      "time-pos": 0
    }
  }
  render() {
    const { state, dispatch } = this.props;

    const pause = () => {
      dispatch(actions.mpv.pause());
      socket.emit("action", "pausing!");
    };

    const unpause = () => {
      dispatch(actions.mpv.unpause());
      socket.emit("action", "unpausing!");
    };

    const style = {
      "base": {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1
      },
      "buttons": {
        "display": "flex",
        justifyContent: "center"
      },
      "button": {
        margin: "1em 1em",
        minHeight: "50px",
        fontSize: "18px",
        borderRadius: 0,
        WebkitAppearance: "none",
        backgroundColor: "white",
        color: "black",
        padding: "1em"
      }
    };

    return (
      <div style={style.base}>
        <h1>Media player controls</h1>
        {/* <Volume></Volume> */}
        <div style={style.buttons}>
          <button style={style.button} onClick={unpause}>unpause</button>
          <button style={style.button} onClick={pause}>pause</button>
        </div>
        <SeekBar />
        <div>{this.state["path"]}</div>
        <Playlist></Playlist>
      </div>
    );
  }
}

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

class Volume extends Component {
  render() {
    const { state, dispatch } = this.props;
    let volume = this.props.volume;
    let input;

    const onChange = debounce(() => {
      dispatch(actions.mpv.volume(input.value));
    }, 2000);

    if (!state || Number.isNaN(state.volume)) {
      volume = "";
    }

    // FIXME: React is re-rendering this component every time the value
    // changes.  Debouncing for now.

    return (
      <label>Volume:
        <input
        defaultValue={volume}
        max="200"
        min="0"
        onChange={onChange}
        ref={ node => { input = node }}
        step="1"
        type="text"
        />
      </label>
    );
  }
}

const mapStateToProps = ({ playlist, volume }) => {
  return {
    playlist,
    volume
  };
};

MediaPlayer = connect(mapStateToProps)(MediaPlayer);
Volume = connect(mapStateToProps)(Volume);
Playlist = connect(mapStateToProps)(Playlist);

export default MediaPlayer;

