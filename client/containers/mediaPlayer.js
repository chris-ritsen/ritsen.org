
import "whatwg-fetch";
import * as actions from "../actions/index";
import * as media from "../media";
import Radium from "radium";
import React, { Component } from "react";
import SeekBar from "../components/seekBar";
import SliderControl from "../components/sliderControl";
import Socket from "../socket";
import VideoEqualiserControl from "../components/videoEqualiserControl";
import { connect } from "react-redux";
import { debounce } from "lodash";

let socket;

class MediaPlayer extends Component {
  componentWillUnmount() {
    socket.disconnect();
  }
  componentWillMount() {
    socket = Socket();

    if (typeof socket === "undefined") {
      return;
    }

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("mpd", (message) => {
      console.log("mpd event", message);
    });

    if (typeof fetch === "undefined") {
      return;
    }

    fetch("/mpv/mpv-version", {
      "headers": new Headers({
        "Content-Type": "application/json"
      }),
      "method": ("GET")
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({
        running: (data["mpv-version"] !== "")
      });
    });
  }
  constructor(props, context) {
    super(props, context);

    this.state = {
      "current": "",
      "length": 0,
      "running": false,
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
        "overflowX": "scroll"
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

    if (!this.state.running) {
      return (<div></div>);
    }

    return (
      <div style={style.base}>
        <h1 style={style.header}>Media player</h1>

        <fieldset>
          <legend>Playback</legend>

          <div style={style.buttons}>
            <button style={style.button} onClick={pause}>pause</button>
            <button style={style.button} onClick={unpause}>unpause</button>
          </div>
        </fieldset>

        <fieldset>
          <legend>Audio</legend>
          <SliderControl min="75" max="125" defaultValue="100" prop="volume"></SliderControl>
        </fieldset>

        <fieldset>
          <legend>Playback speed</legend>
          <SliderControl step="0.01" min="0.6" max="1" defaultValue="1.0" prop="speed">Slow-motion</SliderControl>
          <SliderControl step="0.01" min="1" max="1.25" defaultValue="1.0" prop="speed">Fast-motion</SliderControl>
          <SliderControl step="0.01" min="1" max="12" defaultValue="1.0" prop="speed">Fast-forward</SliderControl>
        </fieldset>

        <fieldset>
          <legend>Video equaliser</legend>
          <VideoEqualiserControl prop="brightness"></VideoEqualiserControl>
          <VideoEqualiserControl prop="contrast"></VideoEqualiserControl>
          <VideoEqualiserControl prop="gamma"></VideoEqualiserControl>
          <VideoEqualiserControl prop="hue"></VideoEqualiserControl>
          <VideoEqualiserControl prop="saturation"></VideoEqualiserControl>
        </fieldset>

        <fieldset>
          <legend>Zoom</legend>
          <SliderControl step="0.01" min="0" max="2.5" defaultValue="0" prop="video-zoom">Scale</SliderControl>
          <SliderControl step="0.01" min="-2.5" max="2.5" defaultValue="0" prop="video-align-x">Align X</SliderControl>
          <SliderControl step="0.01" min="-2.5" max="2.5" defaultValue="0" prop="video-align-y">Align Y</SliderControl>
        </fieldset>
        {/* <SeekBar /> */}
        <div style={style.current}>{this.state["current"]}</div>
      </div>
    );
  }
}

MediaPlayer = connect()(MediaPlayer);

export default MediaPlayer;

