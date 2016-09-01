
import React, { Component } from "react";

class SiteHeader extends Component {
  render() {
    let style = {
      footer: {
        "borderTop": "1px solid white",
        "display": "flex",
        "flexShrink": 0,
        "justifyContent": "center",
        "letterSpacing": "1px",
        "margin": "1.5rem 0",
        "padding": "2.5rem 0",
        "textTransform": "uppercase"
      },
      "link": {
        fontFamily: "'Open Sans', sans-serif",
        padding: "0 0.5rem"
      }
    };

    return (
      <footer style={style.footer}>
        <a target="_blank" style={style.link} href="mailto:chris.ritsen@gmail.com?su=Hello!">email</a>
        <a target="_blank" style={style.link} href="https://github.com/chris-ritsen">github</a>
      </footer>
    );
  }
}

export default SiteHeader;

