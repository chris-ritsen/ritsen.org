
import * as actions from "../actions/index";
import React, { Component } from "react";

class SeekBar extends Component {
  componentWillUnmount() {
  }
  constructor(props, context) {
    super(props, context);

    this.state = {
      "length": 0,
      "loading": true,
      "seeking": false,
      "slider": null,
      "time-pos": 0
    }
  }
  componentWillMount() {
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
      className={this.state.loading ? "loading" : ""}
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

