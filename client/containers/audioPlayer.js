
import "whatwg-fetch";
import * as actions from "../actions/index";
import * as media from "../media";
import Radium from "radium";
import React, { Component } from "react";
import Socket from "../socket";
import { connect } from "react-redux";
import { throttle, debounce } from "lodash";

let socket;

class AudioPlayer extends Component {
  componentWillUnmount() {
    if (socket) {
      socket.disconnect();
    }
  }
  componentWillMount() {
    socket = Socket();

    let updateCurrent = () => {
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
      .then(({ current, length, paused }) => {
        this.setState({
          current,
          length,
          paused
        });
      });
    };

    if (typeof socket === "undefined") {
      return;
    }

    socket.on("mpd", ({ length, paused, current, message }) => {
      if (current) {
        this.setState({
          current,
          length,
          paused
        });
      }
    });

    // TODO: React's server rendering doesn't have access to fetch

    updateCurrent();
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

    const previous = () => {
      dispatch(actions.mpd.previous());
    };

    const next = () => {
      dispatch(actions.mpd.next());
    };

    const style = {
      "base": {
        "display": "flex",
        "flexDirection": "column",
        "flexGrow": 1
      },
      "buttons": {
        "display": "flex",
        "flexWrap": "wrap",
        "justifyContent": "center"
      },
      "current": {
        "fontFamily": "'PT Sans Narrow', sans-serif",
        "fontSize": "1.5rem",
        "marginTop": "1rem",
        "overflowX": "scroll",
        "whiteSpace": "nowrap"
      },
      "header": {
        "display": "flex",
        "flexShrink": 0
      },
      "button": {
        "WebkitAppearance": "none",
        "backgroundColor": "white",
        "borderRadius": 0,
        "color": "black",
        "flexBasis": "125px",
        "fontSize": "18px",
        "margin": "1em 1em",
        "minHeight": "50px",
        "padding": "1em",
        [media.mobile.landscape]: {
          "flexGrow": 1,
          "flexShrink": 0
        },
        [media.mobile.portrait]: {
          "flexGrow": 1,
          "flexShrink": 0
        },
        [media.huge.landscape]: {
          "flexGrow": 0
        },
        [media.huge.portrait]: {
          "flexGrow": 0
        }
      }
    };

    return (
      <div style={style.base}>
        <h1 style={style.header}>Audio player</h1>
        <div style={style.current}>{this.state.current} [{this.state.paused ? "Paused" : "Playing"}] {this.state.length}</div>

        <fieldset>
          <legend>Playback</legend>

          <div style={style.buttons}>
            <button style={style.button} onClick={pause}>pause</button>
            <button style={style.button} onClick={unpause}>unpause</button>
          </div>

          <div style={style.buttons}>
            <button style={style.button} onClick={previous}>previous</button>
            <button style={style.button} onClick={next}>next</button>
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

AudioPlayer = connect()(Radium(AudioPlayer));

export default AudioPlayer;

