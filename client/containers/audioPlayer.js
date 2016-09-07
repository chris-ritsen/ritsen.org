
import "whatwg-fetch";
import * as actions from "../actions/index";
import * as media from "../media";
import Radium from "radium";
import React, { Component } from "react";
import Socket from "../socket";
import { connect } from "react-redux";
import { debounce } from "lodash";

let socket;

class AudioPlayer extends Component {
  componentWillUnmount() {
    socket.disconnect();
  }
  componentWillMount() {
    // TODO: React's server rendering doesn't have access to fetch

    if (typeof fetch === "undefined") {
      return;
    }

    fetch("/mpd/current", {
      "headers": new Headers({
        "Content-Type": "application/json"
      }),
      "method": ("GET")
    })
    .then(response => response.json())
    .then(({ current }) => {
      this.setState({
        current
      });
      console.log(this.state.current);
    });
  }
  constructor(props, context) {
    super(props, context);

    this.state = {
    }
  }
  render() {
    const { state, dispatch } = this.props;

    const pause = () => {
      dispatch(actions.mpd.pause());
    };

    const headphones = () => {
      dispatch(actions.mpd.sink(2));
    };

    const speakers = () => {
      dispatch(actions.mpd.sink(1));
    };

    const unpause = () => {
      dispatch(actions.mpd.unpause());
    };

    const style = {
      "base": {
        "display": "flex",
        "flexDirection": "column",
        "flexGrow": 1
      },
      "buttons": {
        "display": "flex",
        "justifyContent": "center"
      },
      "current": {
				"fontFamily": "'PT Sans Narrow', sans-serif",
        "overflowX": "scroll",
        "whiteSpace": "nowrap"
      },
      "header": {
        "display": "flex",
        "flexShrink": 0
      },
      "button": {
        "margin": "1em 1em",
        "minHeight": "50px",
        "fontSize": "18px",
        "borderRadius": 0,
        "WebkitAppearance": "none",
        "backgroundColor": "white",
        "color": "black",
        "padding": "1em"
      }
    };

    return (
      <div style={style.base}>
        <h1 style={style.header}>Audio player</h1>
        <div style={style.current}>{this.state.current}</div>

        <fieldset>
          <legend>Playback</legend>

          <div style={style.buttons}>
            <button style={style.button} onClick={pause}>pause</button>
            <button style={style.button} onClick={unpause}>unpause</button>
          </div>
        </fieldset>

        <fieldset>
          <legend>Output</legend>

          <div style={style.buttons}>
            <button style={style.button} onClick={headphones}>headphones</button>
            <button style={style.button} onClick={speakers}>speakers</button>
          </div>
        </fieldset>

        <audio controls src="https://music.ritsen.org"></audio>
      </div>
    );
  }
}

AudioPlayer = connect()(AudioPlayer);

export default AudioPlayer;

