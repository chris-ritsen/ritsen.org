
import * as actions from "../actions/index";
import React, { Component } from "react";
import SeekBar from "./seekBar";
import { connect } from "react-redux";
import { debounce } from "lodash";
import Socket from "../socket";

let socket;

class MediaPlayer extends Component {
  componentWillUnmount() {
    socket.disconnect();
  }
  componentWillMount() {
    socket = Socket();
  }
  componentDidMount() {
  }
  constructor(props, context) {
    super(props, context);

    this.state = {
      "length": 0,
      "current": "",
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
      "current": {
				// fontFamily: "'Open Sans Condensed', sans-serif",
				fontFamily: "'PT Sans Narrow', sans-serif",
        overflowX: "scroll"
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
        {/* <SeekBar /> */}
        <div style={style.current}>{this.state["current"]}</div>
      </div>
    );
  }
}

MediaPlayer = connect()(MediaPlayer);

export default MediaPlayer;

