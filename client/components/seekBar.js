
import * as actions from "../actions/index";
import React, { Component } from "react";
import Socket from "../socket.js"

let socket;

class SeekBar extends Component {
  componentWillUnmount() {
    socket.disconnect();
  }
  constructor(props, context) {
    super(props, context);

    this.state = {
      "length": 0,
      "seeking": false,
      "slider": null,
      "time-pos": 0
    }
  }
  componentWillMount() {
    socket = Socket();

    socket.on("message", (data) => {
      if (data["time-pos"] === null || data["length"] === null) {
        return;
      }

      this.setState(data);

      if (!this.state.seeking) {
        this.state.slider.value = data["time-pos"]
      }
    });
  }
  componentDidMount() {
  }
  render() {
    const finished = () => {
      this.state.seeking = false;
    };

    const style = {
      "display": "flex",
      "margin": "1ex 1em"
    };

    const length = this.state["length"];

    const seekToPosition = () => {
      let timePos = this.state.slider.value;

      this.state.seeking = true;

      actions.mpv.seek(timePos);
    };

    return (
      <input
      onKeyUp={finished}
      onMouseUp={finished}
      onBlur={finished}
      style={style}
      max={length}
      min="0"
      ref={ node => { this.state.slider = node }}
      onChange={seekToPosition}
      type="range"
      />
    );
  }
}

export default SeekBar;

