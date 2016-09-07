
import * as actions from "../actions/index";
import * as media from "../media";
import Radium from "radium";
import React, { Component } from "react";
import { connect } from "react-redux";

class SliderControl extends Component {
  static propTypes = {
    prop: React.PropTypes.oneOf([
      "brightness",
      "contrast",
      "gamma",
      "hue",
      "saturation",
      "speed",
      "video-align-x",
      "video-align-y",
      "video-zoom",
      "volume"
    ])
  }
  update(event) {
    const { state, dispatch } = this.props;
    const value = event.target.value;
    const prop = this.props.prop;

    this.setState(Object.assign({}, this.state, {
      value
    }));

    dispatch(actions.mpv.setProp(prop, value));
  }
  reset() {
    const { state, dispatch } = this.props;

    this.setState(Object.assign({}, this.state, {
      value: this.props.defaultValue
    }));

    dispatch(actions.mpv.setProp(this.props.prop, this.props.defaultValue));
  }
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: this.props.defaultValue || 0
    }
  }
  render() {
    const style = {
      "base": {
        "display": "flex",
          "alignItems": "center",
        [media.large.portrait]: {
          "flexWrap": "nowrap",
        },
        [media.large.landscape]: {
          "flexWrap": "nowrap",
        },
        [media.mobile.landscape]: {
          "flexWrap": "wrap"
        },
        [media.mobile.portrait]: {
          "flexWrap": "wrap"
        }
      },
      text: {
        [media.mobile.portrait]: {
          "order": "0",
          "flexBasis": "auto",
          "flexGrow": 1
        },
        "flexBasis": "100px"
      },
      "slider": {
        "flexGrow": 1,
        [media.mobile.portrait]: {
          "flexBasis": "100%",
          "flexGrow": 1,
          "order": 1
        }
      },
      "reset": {
        "margin": "0 0 0 1rem",
        [media.mobile.portrait]: {
          "order": "0"
        }
      }
    };

    const capitaliseFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const labelText = this.props.children ||
      capitaliseFirstLetter(this.props.prop);

    return (
      <label style={style.base}>
        <span style={[style.text]}>{labelText}</span>

        <input
        max={this.props.max}
        min={this.props.min}
        onChange={() => {}}
        onInput={this.update.bind(this)}
        step={this.props.step}
        style={style.slider}
        type="range"
        value={this.state.value}
        />

        <input
        onClick={this.reset.bind(this)}
        style={style.reset}
        type="reset"
        />
      </label>
    );
  }
}

SliderControl = connect()(Radium(SliderControl));

export default SliderControl;

