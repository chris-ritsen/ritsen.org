
import React, { Component } from "react";
import SliderControl from "./sliderControl";

class VideoEqualiserControl extends Component {
  static propTypes = {
    "prop": React.PropTypes.oneOf([
      "brightness",
      "contrast",
      "gamma",
      "hue",
      "saturation"
    ])
  }
  render() {
    return (
      <SliderControl
      defaultValue={0}
      max="100"
      min="-100"
      prop={this.props.prop}
      >{this.props.children}</SliderControl>
    );
  }
}

export default VideoEqualiserControl;

